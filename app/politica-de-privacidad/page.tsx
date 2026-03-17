import type { Metadata } from 'next';
import LegalPageLayout from '../../components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Política de privacidad | Clínica Dental Don Benito',
  description: 'Política de privacidad de Clínica Dental Don Benito.'
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Política de privacidad"
      intro="Aquí se explica cómo se recogen, utilizan, conservan y protegen los datos personales que puedan facilitarse a través de la web de Clínica Dental Don Benito."
    >
      <section className="legal-section">
        <h2>1. Responsable del tratamiento de los datos</h2>
        <ul className="legal-list">
          <li>
            <strong>Responsable:</strong> Clínica Dental Don Benito
          </li>
          <li>
            <strong>Dirección:</strong> C/ Ayala, 4, 06400 Don Benito, Badajoz
          </li>
          <li>
            <strong>Teléfono:</strong> 640 937 567
          </li>
          <li>
            <strong>Correo electrónico:</strong> hola@clinicadentaldonbenito.es
          </li>
          <li>
            <strong>Sitio web:</strong> clinicadentaldonbenito.es
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>2. Finalidad del tratamiento de los datos</h2>
        <p>
          Los datos que la persona usuaria facilite a través de los distintos canales de contacto del
          sitio web podrán ser utilizados para:
        </p>
        <ul className="legal-list">
          <li>Atender consultas, solicitudes de información o peticiones de cita.</li>
          <li>Gestionar la comunicación relacionada con servicios odontológicos ofrecidos por la clínica.</li>
          <li>Dar respuesta a incidencias, sugerencias o solicitudes administrativas.</li>
          <li>Garantizar la seguridad del sitio web y prevenir usos indebidos.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>3. Legitimación para el tratamiento</h2>
        <p>La base jurídica del tratamiento podrá apoyarse, según cada caso, en:</p>
        <ul className="legal-list">
          <li>El consentimiento de la persona interesada al contactar con la clínica.</li>
          <li>La aplicación de medidas precontractuales o contractuales solicitadas por la persona usuaria.</li>
          <li>El cumplimiento de obligaciones legales aplicables a la clínica.</li>
          <li>El interés legítimo vinculado a la seguridad y correcto funcionamiento del sitio web.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>4. Conservación de los datos</h2>
        <p>
          Los datos personales se conservarán durante el tiempo necesario para atender la finalidad para
          la que fueron recabados y, posteriormente, durante los plazos legalmente exigibles en función
          de la naturaleza de la relación mantenida o de las obligaciones normativas aplicables.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Comunicación de datos a terceros</h2>
        <p>
          Con carácter general, no se cederán datos a terceros salvo obligación legal o cuando resulte
          necesario para la prestación de servicios relacionados con el funcionamiento de la clínica o del
          sitio web.
        </p>
        <p>
          En estos casos, el acceso se limitará a proveedores que actúen con las garantías adecuadas y
          siguiendo las instrucciones correspondientes en materia de protección de datos.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Derechos de la persona usuaria</h2>
        <p>
          La persona interesada puede ejercer, en los términos previstos por la normativa, los siguientes
          derechos:
        </p>
        <ul className="legal-list">
          <li>Acceder a sus datos personales.</li>
          <li>Solicitar la rectificación de datos inexactos.</li>
          <li>Solicitar la supresión de sus datos cuando proceda.</li>
          <li>Solicitar la limitación del tratamiento.</li>
          <li>Oponerse al tratamiento en determinados supuestos.</li>
          <li>Solicitar la portabilidad de los datos cuando sea aplicable.</li>
          <li>Retirar el consentimiento en cualquier momento, cuando esa sea la base jurídica.</li>
        </ul>
        <p>
          Para ejercer estos derechos puedes escribir a <strong>hola@clinicadentaldonbenito.es</strong> o
          dirigirte a la clínica en <strong>C/ Ayala, 4, 06400 Don Benito, Badajoz</strong>. Si consideras
          que el tratamiento no se ajusta a la normativa, también puedes presentar una reclamación ante
          la Agencia Española de Protección de Datos.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Medidas de seguridad</h2>
        <p>
          Clínica Dental Don Benito aplica medidas técnicas y organizativas razonables para proteger los
          datos personales frente a accesos no autorizados, alteraciones, pérdidas o tratamientos no
          permitidos, teniendo en cuenta la naturaleza de la información y los riesgos asociados.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Modificaciones de la política de privacidad</h2>
        <p>
          La clínica podrá actualizar esta política de privacidad cuando sea necesario para adaptarla a
          cambios normativos, técnicos o de funcionamiento interno. Cualquier modificación relevante se
          reflejará en esta página.
        </p>
      </section>
    </LegalPageLayout>
  );
}
