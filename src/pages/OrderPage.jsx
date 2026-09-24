import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./OrderPage.css";

function OrderPage() {
  const { cart, totalPrice, clearCart } = useCart();

  // ─── Суммарные габариты и вес посылки ───
  const packageInfo = useMemo(() => {
    const totalWeight = cart.reduce(
      (sum, item) => sum + (item.weight || 0.5) * item.quantity, 0
    );
    const maxLength = cart.reduce(
      (max, item) => Math.max(max, item.length || 10), 0
    );
    const maxWidth = cart.reduce(
      (max, item) => Math.max(max, item.width || 10), 0
    );
    const totalHeight = cart.reduce(
      (sum, item) => sum + (item.height || 5) * item.quantity, 0
    );
    return {
      weight: Math.max(totalWeight, 0.1),
      length: Math.max(maxLength, 1),
      width: Math.max(maxWidth, 1),
      height: Math.max(totalHeight, 1),
    };
  }, [cart]);

  // ─── Состояние формы ───
  const [formData, setFormData] = useState({
    recipientName: "",
    phone: "",
    email: "",
    city: "",
    deliveryType: "pickup",       // pickup | delivery
    deliverySubType: "pvz",       // pvz | courier (только для delivery)
    pickupPointId: "",            // выбранный ПВЗ
    courierAddress: "",
    courierDate: "",
    courierTimeFrom: "",
    courierTimeTo: "",
    paymentMethod: "cash",
    agreeToTerms: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [pickupPoints, setPickupPoints] = useState([]);
  const [isLoadingPoints, setIsLoadingPoints] = useState(false);
  const [deliveryResult, setDeliveryResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calcError, setCalcError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // ─── Загрузка ПВЗ при выборе доставки + вводе города ───
  useEffect(() => {
    if (formData.deliveryType !== "delivery" || formData.deliverySubType !== "pvz") return;
    if (!formData.city.trim() || formData.city.trim().length < 2) return;

    let cancelled = false;
    setIsLoadingPoints(true);

    fetch(
      `/api/delivery/pickup-points?city=${encodeURIComponent(formData.city)}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setPickupPoints(data.points || []);
      })
      .catch(() => {
        if (!cancelled) setPickupPoints([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoadingPoints(false);
      });

    return () => { cancelled = true; };
  }, [formData.deliveryType, formData.deliverySubType, formData.city]);

  // ─── Обработчик изменений ───
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      const next = { ...prev, [name]: type === "checkbox" ? checked : value };

      // Сброс выбора ПВЗ и адреса курьера при переключении подтипа доставки
      if (name === "deliverySubType") {
        next.pickupPointId = "";
        next.courierAddress = "";
      }

      return next;
    });

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
    // Сброс расчёта при изменении влияющих полей
    if (
      ["deliveryType", "deliverySubType", "city", "courierAddress", "pickupPointId"].includes(name)
    ) {
      setDeliveryResult(null);
      setCalcError("");
    }
  };

  // ─── Валидация ───
  const validateForm = () => {
    const errors = {};
    if (!formData.recipientName.trim())
      errors.recipientName = "Введите ФИО (Фамилия Имя Отчество)";
    if (!formData.phone.trim()) errors.phone = "Введите телефон";
    else if (!/^[\d\-+()]{10,15}$/.test(formData.phone.trim()))
      errors.phone = "Введите корректный номер";
    if (!formData.email.trim()) errors.email = "Введите email";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Введите корректный email";
    if (!formData.city.trim()) errors.city = "Введите населённый пункт";
    if (!formData.agreeToTerms)
      errors.agreeToTerms = "Необходимо согласие на обработку данных";

    if (formData.deliveryType === "delivery") {
      if (formData.deliverySubType === "pvz" && !formData.pickupPointId)
        errors.pickupPointId = "Выберите пункт выдачи";
      if (formData.deliverySubType === "courier" && !formData.courierAddress.trim())
        errors.courierAddress = "Введите адрес доставки";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ─── Расчёт доставки ───
  const calculateDelivery = async () => {
    if (!formData.city.trim()) {
      setCalcError("Сначала укажите населённый пункт");
      return;
    }
    if (formData.deliverySubType === "pvz" && !formData.pickupPointId) {
      setCalcError("Выберите пункт выдачи");
      return;
    }
    if (formData.deliverySubType === "courier" && !formData.courierAddress.trim()) {
      setCalcError("Введите адрес доставки");
      return;
    }

    setIsCalculating(true);
    setCalcError("");
    setDeliveryResult(null);

    const payload = {
      package: packageInfo,
      declaredValue: totalPrice,
      city: formData.city,
      deliveryType: formData.deliverySubType, // "pvz" | "courier"
      pickupPointId: formData.deliverySubType === "pvz" ? formData.pickupPointId : null,
      courierAddress: formData.deliverySubType === "courier" ? formData.courierAddress : null,
      courierDate: formData.deliverySubType === "courier" ? formData.courierDate : null,
      courierTimeFrom: formData.deliverySubType === "courier" ? formData.courierTimeFrom : null,
      courierTimeTo: formData.deliverySubType === "courier" ? formData.courierTimeTo : null,
    };

    try {
      const res = await fetch("/api/delivery/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setCalcError(data.error || "Не удалось рассчитать доставку");
        return;
      }
      setDeliveryResult({
        cost: data.deliveryCost,
        insuranceCost: data.insuranceCost || 0,
        period: data.deliveryPeriod,        // { minDays, maxDays }
        available: data.isAvailable !== false,
      });
    } catch {
      setCalcError("Ошибка связи с сервером. Попробуйте позже.");
    } finally {
      setIsCalculating(false);
    }
  };

  // ─── Отправка заказа ───
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (formData.deliveryType === "delivery" && !deliveryResult?.available) {
      setCalcError("Сначала рассчитайте стоимость доставки");
      return;
    }

    setIsSubmitting(true);

    const selectedPoint = pickupPoints.find(
      (p) => p.id === formData.pickupPointId
    );

    const orderData = {
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        weight: item.weight,
        length: item.length,
        width: item.width,
        height: item.height,
      })),
      itemsTotal: totalPrice,
      recipient: {
        fullName: formData.recipientName,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
      },
      package: packageInfo,
      declaredValue: totalPrice,
      delivery: {
        type: formData.deliveryType,            // "pickup" | "delivery"
        subType:
          formData.deliveryType === "delivery"
            ? formData.deliverySubType           // "pvz" | "courier"
            : null,
        service: "ozon",
        pickupPoint: formData.deliverySubType === "pvz" && selectedPoint
          ? {
              id: selectedPoint.id,
              address: selectedPoint.address,
              name: selectedPoint.name,
              workTime: selectedPoint.workTime || null,
            }
          : null,
        courier:
          formData.deliverySubType === "courier"
            ? {
                address: formData.courierAddress,
                date: formData.courierDate,
                timeFrom: formData.courierTimeFrom,
                timeTo: formData.courierTimeTo,
              }
            : null,
      },
      deliveryCalculation: deliveryResult
        ? {
            cost: deliveryResult.cost,
            insuranceCost: deliveryResult.insuranceCost,
            period: deliveryResult.period,
          }
        : null,
      payment: { method: formData.paymentMethod },
      grandTotal: totalPrice + (deliveryResult?.cost || 0),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        alert(`Ошибка: ${data.error || "Не удалось создать заказ"}`);
        return;
      }
      clearCart();
      setOrderSuccess({
        postingNumber: data.postingNumber || data.orderId || "—",
        grandTotal: orderData.grandTotal,
      });
    } catch {
      alert("Ошибка связи с сервером. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Экран успеха ───
  if (orderSuccess) {
    return (
      <section className="order-hero-section">
        <div className="order-page">
          <h1 className="order-title">Заказ оформлен!</h1>
          <div
            className="info-message"
            style={{
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <span className="info-icon" style={{ fontSize: "2rem" }}>✅</span>
            <p>
              Номер заказа: <b>{orderSuccess.postingNumber}</b>
              <br />
              Сумма к оплате: <b>{orderSuccess.grandTotal} ₽</b>
            </p>
          </div>
          <Link
            to="/catalog"
            className="back-to-cart-btn"
            style={{ marginTop: "2rem" }}
          >
            Вернуться в каталог
          </Link>
        </div>
      </section>
    );
  }

  // ─── Пустая корзина ───
  if (cart.length === 0) {
    return (
      <section className="order-hero-section">
        <div className="order-page">
          <h1 className="order-title">Корзина пуста</h1>
          <p style={{ textAlign: "center", color: "#64748b", marginBottom: "2rem" }}>
            Добавьте товары из каталога, чтобы оформить заказ.
          </p>
          <Link to="/catalog" className="back-to-cart-btn">
            Перейти в каталог
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="order-hero-section">
      <div className="order-page">
        <h1 className="order-title">Оформление заказа</h1>

        {/* Сводка заказа */}
        <div className="info-message" style={{ marginBottom: "2rem" }}>
          <span className="info-icon">🛒</span>
          <p>
            Товаров: <b>{cart.length}</b> • Сумма: <b>{totalPrice} ₽</b>
            <br />
            Вес: <b>{packageInfo.weight.toFixed(2)} кг</b> • Габариты:{" "}
            <b>
              {packageInfo.length}×{packageInfo.width}×{packageInfo.height} см
            </b>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* ─── Данные получателя ─── */}
          <div className="form-section">
            <h2 className="section-title">Данные получателя</h2>

            <div className="form-group">
              <label className="form-label">
                ФИО (Фамилия Имя Отчество) <span className="required">*</span>
              </label>
              <input
                type="text"
                name="recipientName"
                className={`form-input ${formErrors.recipientName ? "error" : ""}`}
                value={formData.recipientName}
                onChange={handleInputChange}
                placeholder="Иванов Иван Иванович"
              />
              {formErrors.recipientName && (
                <span className="error-message">{formErrors.recipientName}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                Телефон <span className="required">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                className={`form-input ${formErrors.phone ? "error" : ""}`}
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+7 (xxx) xxx-xx-xx"
              />
              {formErrors.phone && (
                <span className="error-message">{formErrors.phone}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                className={`form-input ${formErrors.email ? "error" : ""}`}
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@mail.ru"
              />
              {formErrors.email && (
                <span className="error-message">{formErrors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                Населённый пункт <span className="required">*</span>
              </label>
              <input
                type="text"
                name="city"
                className={`form-input ${formErrors.city ? "error" : ""}`}
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Город или населённый пункт"
              />
              {formErrors.city && (
                <span className="error-message">{formErrors.city}</span>
              )}
            </div>
          </div>

          {/* ─── Способ получения ─── */}
          <div className="form-section">
            <h2 className="section-title">Способ получения</h2>

            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="deliveryType"
                  value="pickup"
                  checked={formData.deliveryType === "pickup"}
                  onChange={handleInputChange}
                />
                <span className="radio-custom"></span>
                Самовывоз
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="deliveryType"
                  value="delivery"
                  checked={formData.deliveryType === "delivery"}
                  onChange={handleInputChange}
                />
                <span className="radio-custom"></span>
                Доставка через Ozon
              </label>
            </div>

            {/* ── Самовывоз ── */}
            {formData.deliveryType === "pickup" && (
              <div className="conditional-fields">
                <div className="info-message">
                  <span className="info-icon">ℹ️</span>
                  <p>
                    Товар бронируется на 7 дней. Оплата при получении по
                    адресу: пос. Кратово, ул. Молодцова, д. 21-а.
                  </p>
                </div>
              </div>
            )}

            {/* ── Доставка через Ozon ── */}
            {formData.deliveryType === "delivery" && (
              <div className="conditional-fields">
                {/* Выбор подтипа доставки */}
                <div className="form-group">
                  <label className="form-label">Тип доставки</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="deliverySubType"
                        value="pvz"
                        checked={formData.deliverySubType === "pvz"}
                        onChange={handleInputChange}
                      />
                      <span className="radio-custom"></span>
                      Пункт выдачи (ПВЗ)
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="deliverySubType"
                        value="courier"
                        checked={formData.deliverySubType === "courier"}
                        onChange={handleInputChange}
                      />
                      <span className="radio-custom"></span>
                      Курьерская доставка
                    </label>
                  </div>
                </div>

                {/* ── ПВЗ: выбор пункта выдачи ── */}
                {formData.deliverySubType === "pvz" && (
                  <div className="form-group">
                    <label className="form-label">
                      Выберите пункт выдачи <span className="required">*</span>
                    </label>
                    {isLoadingPoints ? (
                      <p style={{ color: "#64748b", padding: "8px 0" }}>
                        Загрузка пунктов выдачи…
                      </p>
                    ) : pickupPoints.length === 0 ? (
                      <div className="info-message">
                        <span className="info-icon">ℹ️</span>
                        <p>
                          Введите населённый пункт выше — список доступных
                          пунктов выдачи появится автоматически.
                        </p>
                      </div>
                    ) : (
                      <select
                        name="pickupPointId"
                        className={`form-input ${formErrors.pickupPointId ? "error" : ""}`}
                        value={formData.pickupPointId}
                        onChange={handleInputChange}
                      >
                        <option value="">— Выберите ПВЗ —</option>
                        {pickupPoints.map((point) => (
                          <option key={point.id} value={point.id}>
                            {point.name} — {point.address}
                            {point.workTime ? ` (${point.workTime})` : ""}
                          </option>
                        ))}
                      </select>
                    )}
                    {formErrors.pickupPointId && (
                      <span className="error-message">
                        {formErrors.pickupPointId}
                      </span>
                    )}
                  </div>
                )}

                {/* ── Курьер: адрес + дата + время ── */}
                {formData.deliverySubType === "courier" && (
                  <>
                    <div className="form-group">
                      <label className="form-label">
                        Адрес доставки <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="courierAddress"
                        className={`form-input ${formErrors.courierAddress ? "error" : ""}`}
                        value={formData.courierAddress}
                        onChange={handleInputChange}
                        placeholder="Улица, дом, квартира"
                      />
                      {formErrors.courierAddress && (
                        <span className="error-message">
                          {formErrors.courierAddress}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Дата доставки</label>
                      <input
                        type="date"
                        name="courierDate"
                        className="form-input"
                        value={formData.courierDate}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div style={{ display: "flex", gap: "8px" }}>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Время «с»</label>
                        <input
                          type="time"
                          name="courierTimeFrom"
                          className="form-input"
                          value={formData.courierTimeFrom}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Время «до»</label>
                        <input
                          type="time"
                          name="courierTimeTo"
                          className="form-input"
                          value={formData.courierTimeTo}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* ── Кнопка расчёта доставки ── */}
                <button
                  type="button"
                  className="submit-order-btn"
                  onClick={calculateDelivery}
                  disabled={
                    isCalculating ||
                    (formData.deliverySubType === "pvz" && !formData.pickupPointId) ||
                    (formData.deliverySubType === "courier" && !formData.courierAddress.trim())
                  }
                  style={{
                    backgroundColor: "#3e9fae",
                    boxShadow: "none",
                    marginTop: "0.5rem",
                    opacity:
                      isCalculating ||
                      (formData.deliverySubType === "pvz" && !formData.pickupPointId) ||
                      (formData.deliverySubType === "courier" && !formData.courierAddress.trim())
                        ? 0.6
                        : 1,
                  }}
                >
                  {isCalculating ? "Расчёт…" : "Рассчитать стоимость доставки"}
                </button>

                {/* Ошибка расчёта */}
                {calcError && (
                  <div
                    className="info-message"
                    style={{ backgroundColor: "#fff5f5", borderLeftColor: "#e53e3e" }}
                  >
                    <span className="info-icon">⚠️</span>
                    <p style={{ color: "#e53e3e" }}>{calcError}</p>
                  </div>
                )}

                {/* Результат расчёта */}
                {deliveryResult && deliveryResult.available && (
                  <div className="info-message">
                    <span className="info-icon">📦</span>
                    <p>
                      <b>Доставка: {deliveryResult.cost} ₽</b>
                      {deliveryResult.insuranceCost > 0 && (
                        <>
                          {" • Страховка: "}
                          {deliveryResult.insuranceCost} ₽
                        </>
                      )}
                      {deliveryResult.period && (
                        <>
                          {" • Срок: "}
                          {deliveryResult.period.minDays}
                          {deliveryResult.period.minDays !== deliveryResult.period.maxDays
                            ? `–${deliveryResult.period.maxDays} дн.`
                            : " дн."}
                        </>
                      )}
                      <br />
                      <b>Итого к оплате: {totalPrice + deliveryResult.cost} ₽</b>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ─── Способ оплаты ─── */}
          <div className="form-section">
            <h2 className="section-title">Способ оплаты</h2>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === "cash"}
                  onChange={handleInputChange}
                />
                <span className="radio-custom"></span>
                Наличными при получении
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleInputChange}
                />
                <span className="radio-custom"></span>
                Картой онлайн
              </label>
            </div>
          </div>

          {/* ─── Согласие ─── */}
          <div className="form-section">
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                />
                <span className="checkbox-custom"></span>
                Я согласен на обработку персональных данных
              </label>
              {formErrors.agreeToTerms && (
                <span className="error-message">{formErrors.agreeToTerms}</span>
              )}
            </div>
          </div>

          {/* ─── Контакты ─── */}
          <div className="contact-info-block">
            <p className="contact-info-title">Оформить заказ по телефону:</p>
            <div className="contact-phones">
              <a href="tel:+79031395158" className="contact-phone">
                8 (903) 139-51-58
              </a>
              <span className="phone-separator">/</span>
              <a href="tel:+84964626202" className="contact-phone">
                8-496-462-62-02
              </a>
            </div>
          </div>

          {/* ─── Кнопки ─── */}
          <button type="submit" className="submit-order-btn" disabled={isSubmitting}>
            {isSubmitting ? "Отправка…" : "Оформить заказ"}
          </button>
          <Link to="/cart" className="back-to-cart-btn">
            ← Вернуться в корзину
          </Link>
        </form>
      </div>
    </section>
  );
}

export default OrderPage;
