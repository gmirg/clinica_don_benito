import type { Metadata } from 'next';
import LegalPageLayout from '../../components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Aviso legal | Clínica Dental Don Benito',
  description: 'Aviso legal de Clínica Dental Don Benito.'
};

export default function LegalNoticePage() {
  return (
    <LegalPageLayout
      title="Aviso legal"
      intro="En esta página se recoge la información general del sitio web, las condiciones de uso y el marco jurídico aplicable a la navegación por Clínica Dental Don Benito."
    >
      <section className="legal-section">
        <h2>1. Objeto</h2>
        <p>
          El presente aviso legal regula el acceso, la navegación y el uso del sitio web de Clínica
          Dental Don Benito, así como la relación entre la titularidad del sitio y las personas que lo
          visitan. La utilización de esta web implica la aceptación de las condiciones aquí expuestas.
        </p>
        <p>
          Este espacio tiene carácter informativo y está orientado a dar a conocer la clínica, sus
          servicios odontológicos, sus vías de contacto y otros contenidos relacionados con la salud
          bucodental.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Identificación del titular</h2>
        <ul className="legal-list">
          <li>
            <strong>Titular del sitio web:</strong> Clínica Dental Don Benito
          </li>
          <li>
            <strong>Dirección:</strong> C/ Ayala, 4, 06400 Don Benito, Badajoz
          </li>
          <li>
            <strong>Teléfono de contacto:</strong> 640 937 567
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
        <h2>3. Condiciones de uso</h2>
        <p>
          La persona usuaria se compromete a utilizar esta web de forma diligente, lícita y respetuosa,
          evitando conductas que puedan perjudicar a la clínica, a otras personas usuarias o al propio
          funcionamiento del sitio.
        </p>
        <p>No está permitido, entre otros usos:</p>
        <ul className="legal-list">
          <li>Emplear la web para fines contrarios a la ley, la buena fe o el orden público.</li>
          <li>Introducir código malicioso o realizar acciones que comprometan la seguridad del sitio.</li>
          <li>Utilizar la información publicada con fines ilícitos o lesivos para terceros.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>4. Propiedad intelectual e industrial</h2>
        <p>
          Los contenidos del sitio web, incluyendo textos, imágenes, diseño, estructura, logotipos,
          elementos gráficos, código y demás materiales, están protegidos por la normativa aplicable en
          materia de propiedad intelectual e industrial.
        </p>
        <p>
          Salvo autorización expresa, no está permitida su reproducción, distribución, transformación,
          comunicación pública o cualquier otro uso que exceda la navegación privada y estrictamente
          informativa.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Responsabilidad</h2>
        <p>
          Clínica Dental Don Benito trabaja para que la información ofrecida en esta web sea clara,
          útil y esté actualizada. No obstante, no puede garantizar la ausencia absoluta de errores,
          interrupciones puntuales del servicio o incidencias derivadas de causas ajenas a su control.
        </p>
        <p>
          La clínica no asume responsabilidad por un uso inadecuado de los contenidos ni por daños
          derivados de accesos indebidos, virus, fallos técnicos o interrupciones de red que no le sean
          directamente imputables.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Política de enlaces</h2>
        <p>
          Esta web puede incluir enlaces a sitios de terceros con fines informativos o de utilidad para
          la persona usuaria. La existencia de dichos enlaces no implica aprobación, control permanente
          ni responsabilidad sobre sus contenidos, servicios o políticas.
        </p>
        <p>
          Si cualquier persona considera que un enlace vulnera derechos o conduce a contenidos
          inadecuados, puede comunicarlo a la clínica para su revisión.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Protección de datos personales</h2>
        <p>
          El tratamiento de los datos personales que puedan recabarse a través del sitio web se realiza
          conforme a la normativa vigente en materia de protección de datos. La información detallada se
          encuentra disponible en la Política de privacidad.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Legislación aplicable y jurisdicción</h2>
        <p>
          La relación entre Clínica Dental Don Benito y la persona usuaria se regirá por la normativa
          española vigente. Para la resolución de cualquier controversia que pudiera surgir en relación
          con el sitio web, ambas partes se someterán a los juzgados y tribunales competentes conforme a
          derecho.
        </p>
      </section>

      <section className="legal-section">
        <h2>9. Contacto</h2>
        <p>
          Para cualquier consulta relacionada con este aviso legal o con el funcionamiento del sitio
          web, puedes escribir a <strong>hola@clinicadentaldonbenito.es</strong> o dirigirte a la clínica
          en <strong>C/ Ayala, 4, 06400 Don Benito, Badajoz</strong>.
        </p>
      </section>
    </LegalPageLayout>
  );
}
