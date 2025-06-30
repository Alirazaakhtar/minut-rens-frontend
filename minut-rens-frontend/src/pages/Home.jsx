import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 mb-5">
        <img
          src="https://images.unsplash.com/photo-1549037173-e3b717902c57?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Renseri"
          className="img-fluid rounded-top"
          style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }}
        />
        <div className="card-body text-center">
          <h1 className="display-5 mb-3">Minut Rens</h1>
          <p className="lead mb-4">Hurtig, professionel og pålidelig rensning af tøj og tekstiler.</p>
          <Link to="/book" className="btn btn-primary btn-lg">Book en service</Link>
        </div>
      </div>

      <h2 className="mb-4 text-center">Vores afdelinger</h2>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm border-0 p-4 h-100">
            <h4>København</h4>
            <p><strong>Adresse:</strong><br />Vesterbrogade 41, 1620 København V</p>
            <p><strong>Telefon:</strong> 29 43 43 43<br /><strong>Email:</strong> info@minutrens.dk</p>
            <h5>Åbningstider:</h5>
            <ul className="list-unstyled">
              <li>Man – Fre: 11:00 – 17:30</li>
              <li>Lørdag: 11:00 – 13:00</li>
              <li>Helligdage: Lukket</li>
            </ul>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm border-0 p-4 h-100">
            <h4>Hillerød</h4>
            <p><strong>Adresse:</strong><br />Slotsgade 25, 3400 Hillerød</p>
            <p><strong>Telefon:</strong> 31 12 12 12<br /><strong>Email:</strong> hillerod@minutrens.dk</p>
            <h5>Åbningstider:</h5>
            <ul className="list-unstyled">
              <li>Man – Fre: 10:00 – 17:30</li>
              <li>Lørdag: 10:00 – 13:00</li>
              <li>Helligdage: Lukket</li>
            </ul>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm border-0 p-4 h-100">
            <h4>Helsingør</h4>
            <p><strong>Adresse:</strong><br />Stengade 45, 3000 Helsingør</p>
            <p><strong>Telefon:</strong> 32 34 34 34<br /><strong>Email:</strong> helsingor@minutrens.dk</p>
            <h5>Åbningstider:</h5>
            <ul className="list-unstyled">
              <li>Man – Fre: 11:00 – 17:30</li>
              <li>Lørdag: 11:00 – 13:00</li>
              <li>Helligdage: Lukket</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0 p-4 mt-5">
        <ContactForm />
      </div>
    </div>
  );
};

export default Home;