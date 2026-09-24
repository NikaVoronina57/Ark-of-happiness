const ContactCard = ({ icon, label, value }) => (
  <div className="contact-card">
    <span className="contact-icon">{icon}</span>
    <div>
      <span className="contact-label">{label}</span>
      <span className="contact-value">{value}</span>
    </div>
  </div>
);

export default ContactCard;
