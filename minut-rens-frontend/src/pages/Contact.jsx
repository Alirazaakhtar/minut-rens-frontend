import ContactForm from '../components/ContactForm';

const ContactPage = () => {
  return (
    <div className="container mt-5 px-3">
      <h1 className="mb-4 text-center">Kontakt os</h1>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col">
          <div className="card p-4 h-100">
            <h4>Åbningstider – København</h4>
            <ul className="list-unstyled">
              <li>Man – Fre: 11:00 – 17:30</li>
              <li>Lørdag: 11:00 – 13:00</li>
              <li>Helligdage: Lukket</li>
            </ul>
            <h4>Kontakt</h4>
            <p>
              <strong>Telefon:</strong> 29 43 43 43<br />
              <strong>Email:</strong> info@minutrens.dk<br />
              <strong>Adresse:</strong><br />
              Vesterbrogade 41, 1620 København V
            </p>
          </div>
        </div>
        <div className="col">
          <div className="card p-4 h-100">
            <h4>Send os en besked</h4>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;