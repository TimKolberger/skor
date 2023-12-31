import type { LayoutProps } from '../features/router/types.ts'
import { HeaderMenu } from '../layout/header-menu.tsx'
import {
  AppLayout,
  AppLayoutContent,
  AppLayoutHeader,
} from '../layout/layout.tsx'

export const Layout = ({ children }: LayoutProps) => {
  return (
    <AppLayout>
      <AppLayoutHeader title="Legal notice" backLink="/">
        <HeaderMenu />
      </AppLayoutHeader>
      <AppLayoutContent variant="max-width">{children}</AppLayoutContent>
    </AppLayout>
  )
}

export default function LegalNoticePage() {
  return (
    <>
      <h1>Legal Notice</h1>
      <p>Tim Kolberger</p>
      <br />
      <strong>Kontakt:</strong>
      <p>
        E-Mail:{' '}
        <span
          className={
            'direction-ltr [unicode-bidi:bidi-override] before:content-[attr(data-user)_"@"_attr(data-website)]'
          }
          dir="ltr"
          data-user="mail"
          data-website="solutionmatters&#46;de"
        />
      </p>
      <p>
        <br />
        <strong>Haftungsausschluss: </strong>
        <br />
        <br />
        <strong>Haftung für Inhalte</strong>
        <br />
        <br />
        Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die
        Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
        jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7
        Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
        Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
        Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
        gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
        forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
        Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
        Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
        Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
        entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
        entfernen.
      </p>
      <br />
      <strong>Haftung für Links</strong>
      <br />
      Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
      Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
      Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
      Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
      verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung
      auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
      Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche
      Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte
      einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
      Rechtsverletzungen werden wir derartige Links umgehend entfernen.
      <br />
      <br />
      <strong>Urheberrecht</strong>
      <br />
      Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
      Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
      Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen
      des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
      Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den
      privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf
      dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
      Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
      gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung
      aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei
      Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend
      entfernen.
      <br />
      <br />
      <strong>Datenschutz</strong>
      <br />
      Die Nutzung unserer Webseite ist in der Regel ohne Angabe
      personenbezogener Daten möglich. Soweit auf unseren Seiten
      personenbezogene Daten (beispielsweise Name, Anschrift oder
      eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf
      freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung
      nicht an Dritte weitergegeben. <br />
      Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der
      Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein
      lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
      möglich. <br />
      Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten
      Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich
      angeforderter Werbung und Informationsmaterialien wird hiermit
      ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich
      ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von
      Werbeinformationen, etwa durch Spam-Mails, vor.
      <br />
      <br />
      <p>
        Website Impressum erstellt durch{' '}
        <a href="http://www.impressum-generator.de">impressum-generator.de</a>{' '}
        von der{' '}
        <a href="http://www.kanzlei-hasselbach.de/fachanwalt-arbeitsrecht-koeln/">
          Kanzlei Hasselbach, Köln
        </a>
      </p>
    </>
  )
}
