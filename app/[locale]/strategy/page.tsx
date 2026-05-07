import { getTranslations } from 'next-intl/server'
import { Target, Eye, Handshake, BarChart3, Shield, Lightbulb, Globe, Heart } from 'lucide-react'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const titles: Record<string, string> = {
    ca: 'Estratègia | Unaria',
    es: 'Estrategia | Unaria',
    en: 'Strategy | Unaria',
    fr: 'Stratégie | Unaria',
    de: 'Strategie | Unaria',
  }
  return { title: titles[locale] ?? titles.ca }
}

interface Pillar {
  number: string
  icon: React.ReactNode
  accent: string
  bg: string
  border: string
  title: string
  subtitle: string
  points: string[]
}

const content: Record<string, {
  badge: string
  title: string
  subtitle: string
  pillars: Pillar[]
}> = {
  ca: {
    badge: 'Com actuem',
    title: 'La nostra estratègia',
    subtitle: 'Unaria opera sobre sis pilars estratègics que garanteixen que cada euro recaptat generi el màxim impacte social possible.',
    pillars: [
      {
        number: '01',
        icon: <Heart className="w-7 h-7" />,
        accent: 'text-rose-600',
        bg: 'bg-rose-50',
        border: 'border-rose-100',
        title: 'Quotes mensuals recurrents',
        subtitle: 'Finançament estable i previsible',
        points: [
          'Model de subscripció mensual des de 6€/mes que permet planificar l\'ajuda a llarg termini.',
          'La recurrència elimina la incertesa del finançament estacional i garanteix fons continus.',
          'Cada soci pot escollir la seva quota: 6€, 10€, 12€, 15€, 20€, 25€, 30€ o personalitzada.',
          'Les quotes es gestionen via SEPA o targeta de crèdit amb seguretat bancària completa.',
        ],
      },
      {
        number: '02',
        icon: <Target className="w-7 h-7" />,
        accent: 'text-brand-blue',
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        title: 'Selecció rigorosa d\'ONGs',
        subtitle: 'Només entitats auditades i acreditades',
        points: [
          'Criteris de selecció basats en historial d\'impacte, auditories externes i acreditació oficial.',
          'Avaluació anual de cada ONG partner: eficiència, transparència i abast dels projectes.',
          'Diversificació per àrees geogràfiques i tipus d\'acció humanitària.',
          'Exigim memòries anuals amb indicadors d\'impacte verificables per a cada projecte finançat.',
        ],
      },
      {
        number: '03',
        icon: <BarChart3 className="w-7 h-7" />,
        accent: 'text-brand-teal',
        bg: 'bg-teal-50',
        border: 'border-teal-100',
        title: 'Distribució optimitzada del fons',
        subtitle: 'Priorització intel·ligent de projectes',
        points: [
          'Els fons s\'assignen estratègicament a les àrees i projectes on la necessitat és més crítica.',
          'Es prioritzen intervencions amb capacitat demostrada de generar canvis reals a llarg termini.',
          'Mantenim els costos operatius al mínim absolut perquè la màxima quantitat possible arribi als destinataris.',
          'La distribució es revalua contínuament en funció de les urgències globals i els resultats de les ONGs partners.',
        ],
      },
      {
        number: '04',
        icon: <Eye className="w-7 h-7" />,
        accent: 'text-purple-600',
        bg: 'bg-purple-50',
        border: 'border-purple-100',
        title: 'Transparència radical',
        subtitle: 'Comptes oberts i verificables',
        points: [
          'Publicació trimestral de totes les transferències realitzades, amb imports i referències.',
          'Accés públic al portal de transparència sense necessitat de registre.',
          'Auditoria externa anual per una firma independent acreditada.',
          'Informe d\'impacte anual amb dades concretes de beneficiaris, projectes i resultats.',
        ],
      },
      {
        number: '05',
        icon: <Globe className="w-7 h-7" />,
        accent: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-100',
        title: 'Creixement de la comunitat',
        subtitle: 'Solidaritat organitzada a escala',
        points: [
          'Estratègia de creixement orgànic basada en la confiança i el boca-orella entre socis.',
          'Programa de referits: cada soci pot convidar contactes i ampliar l\'impacte col·lectiu.',
          'Obertura a cinc idiomes (ca/es/en/fr/de) per créixer cap a mercats europeus.',
          'Com més socis, major fons disponible i major capacitat de negociació amb les ONGs.',
        ],
      },
      {
        number: '06',
        icon: <Lightbulb className="w-7 h-7" />,
        accent: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-100',
        title: 'Innovació i millora contínua',
        subtitle: 'Adaptació constant al context global',
        points: [
          'Revisió anual dels criteris de selecció d\'ONGs en funció de les crisis humanitàries actives.',
          'Incorporació de tecnologia per reduir costos operatius i millorar l\'experiència del soci.',
          'Col·laboració amb universitats i think-tanks per mesurar millor l\'impacte real.',
          'Obertura a nous models de participació: donacions puntuals, llegats solidaris i empreses.',
        ],
      },
    ],
  },
  es: {
    badge: 'Cómo actuamos',
    title: 'Nuestra estrategia',
    subtitle: 'Unaria opera sobre seis pilares estratégicos que garantizan que cada euro recaudado genere el máximo impacto social posible.',
    pillars: [
      {
        number: '01',
        icon: <Heart className="w-7 h-7" />,
        accent: 'text-rose-600',
        bg: 'bg-rose-50',
        border: 'border-rose-100',
        title: 'Cuotas mensuales recurrentes',
        subtitle: 'Financiación estable y previsible',
        points: [
          'Modelo de suscripción mensual desde 6€/mes que permite planificar la ayuda a largo plazo.',
          'La recurrencia elimina la incertidumbre del financiamiento estacional y garantiza fondos continuos.',
          'Cada socio puede elegir su cuota: 6€, 10€, 12€, 15€, 20€, 25€, 30€ o personalizada.',
          'Las cuotas se gestionan vía SEPA o tarjeta de crédito con seguridad bancaria completa.',
        ],
      },
      {
        number: '02',
        icon: <Target className="w-7 h-7" />,
        accent: 'text-brand-blue',
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        title: 'Selección rigurosa de ONGs',
        subtitle: 'Solo entidades auditadas y acreditadas',
        points: [
          'Criterios de selección basados en historial de impacto, auditorías externas y acreditación oficial.',
          'Evaluación anual de cada ONG partner: eficiencia, transparencia y alcance de los proyectos.',
          'Diversificación por áreas geográficas y tipos de acción humanitaria.',
          'Exigimos memorias anuales con indicadores de impacto verificables para cada proyecto financiado.',
        ],
      },
      {
        number: '03',
        icon: <BarChart3 className="w-7 h-7" />,
        accent: 'text-brand-teal',
        bg: 'bg-teal-50',
        border: 'border-teal-100',
        title: 'Distribución optimizada del fondo',
        subtitle: 'Priorización inteligente de proyectos',
        points: [
          'Los fondos se asignan estratégicamente a las áreas y proyectos donde la necesidad es más crítica.',
          'Se priorizan intervenciones con capacidad demostrada de generar cambios reales a largo plazo.',
          'Mantenemos los costes operativos al mínimo absoluto para que la máxima cantidad posible llegue a los destinatarios.',
          'La distribución se reevalúa continuamente en función de las urgencias globales y los resultados de las ONGs partners.',
        ],
      },
      {
        number: '04',
        icon: <Eye className="w-7 h-7" />,
        accent: 'text-purple-600',
        bg: 'bg-purple-50',
        border: 'border-purple-100',
        title: 'Transparencia radical',
        subtitle: 'Cuentas abiertas y verificables',
        points: [
          'Publicación trimestral de todas las transferencias realizadas, con importes y referencias.',
          'Acceso público al portal de transparencia sin necesidad de registro.',
          'Auditoría externa anual por una firma independiente acreditada.',
          'Informe de impacto anual con datos concretos de beneficiarios, proyectos y resultados.',
        ],
      },
      {
        number: '05',
        icon: <Globe className="w-7 h-7" />,
        accent: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-100',
        title: 'Crecimiento de la comunidad',
        subtitle: 'Solidaridad organizada a escala',
        points: [
          'Estrategia de crecimiento orgánico basada en la confianza y el boca a boca entre socios.',
          'Programa de referidos: cada socio puede invitar contactos y ampliar el impacto colectivo.',
          'Apertura a cinco idiomas (ca/es/en/fr/de) para crecer hacia mercados europeos.',
          'A más socios, mayor fondo disponible y mayor capacidad de negociación con las ONGs.',
        ],
      },
      {
        number: '06',
        icon: <Lightbulb className="w-7 h-7" />,
        accent: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-100',
        title: 'Innovación y mejora continua',
        subtitle: 'Adaptación constante al contexto global',
        points: [
          'Revisión anual de los criterios de selección de ONGs en función de las crisis humanitarias activas.',
          'Incorporación de tecnología para reducir costes operativos y mejorar la experiencia del socio.',
          'Colaboración con universidades y think-tanks para medir mejor el impacto real.',
          'Apertura a nuevos modelos de participación: donaciones puntuales, legados solidarios y empresas.',
        ],
      },
    ],
  },
  en: {
    badge: 'How we act',
    title: 'Our strategy',
    subtitle: 'Unaria operates on six strategic pillars that ensure every euro raised generates the greatest possible social impact.',
    pillars: [
      {
        number: '01',
        icon: <Heart className="w-7 h-7" />,
        accent: 'text-rose-600',
        bg: 'bg-rose-50',
        border: 'border-rose-100',
        title: 'Recurring monthly fees',
        subtitle: 'Stable and predictable funding',
        points: [
          'Monthly subscription model from €6/month enabling long-term aid planning.',
          'Recurrence eliminates seasonal funding uncertainty and ensures continuous funds.',
          'Each member chooses their fee: €6, €10, €12, €15, €20, €25, €30 or custom.',
          'Fees managed via SEPA or credit card with full banking-grade security.',
        ],
      },
      {
        number: '02',
        icon: <Target className="w-7 h-7" />,
        accent: 'text-brand-blue',
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        title: 'Rigorous NGO selection',
        subtitle: 'Only audited, accredited organisations',
        points: [
          'Selection criteria based on impact track record, external audits and official accreditation.',
          'Annual evaluation of each partner NGO: efficiency, transparency and project reach.',
          'Diversification across geographic areas and types of humanitarian action.',
          'We require annual reports with verifiable impact indicators for each funded project.',
        ],
      },
      {
        number: '03',
        icon: <BarChart3 className="w-7 h-7" />,
        accent: 'text-brand-teal',
        bg: 'bg-teal-50',
        border: 'border-teal-100',
        title: 'Optimised fund distribution',
        subtitle: 'Intelligent project prioritization',
        points: [
          'Funds are strategically allocated to areas and projects where the need is most critical.',
          'We prioritize interventions with a proven capacity to generate real long-term change.',
          'Operating costs are kept to the absolute minimum so that the maximum possible amount reaches the beneficiaries.',
          'The distribution is continuously re-evaluated based on global urgencies and the results of partner NGOs.',
        ],
      },
      {
        number: '04',
        icon: <Eye className="w-7 h-7" />,
        accent: 'text-purple-600',
        bg: 'bg-purple-50',
        border: 'border-purple-100',
        title: 'Radical transparency',
        subtitle: 'Open, verifiable accounts',
        points: [
          'Quarterly publication of all transfers made, with amounts and references.',
          'Public access to the transparency portal — no registration required.',
          'Annual external audit by an accredited independent firm.',
          'Annual impact report with concrete data on beneficiaries, projects and results.',
        ],
      },
      {
        number: '05',
        icon: <Globe className="w-7 h-7" />,
        accent: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-100',
        title: 'Community growth',
        subtitle: 'Organised solidarity at scale',
        points: [
          'Organic growth strategy built on trust and word-of-mouth among members.',
          'Referral programme: each member can invite contacts and expand the collective impact.',
          'Available in five languages (ca/es/en/fr/de) to grow into European markets.',
          'More members means a larger fund and greater negotiating power with NGOs.',
        ],
      },
      {
        number: '06',
        icon: <Lightbulb className="w-7 h-7" />,
        accent: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-100',
        title: 'Innovation and continuous improvement',
        subtitle: 'Constant adaptation to the global context',
        points: [
          'Annual review of NGO selection criteria based on active humanitarian crises.',
          'Technology adoption to reduce operating costs and improve the member experience.',
          'Collaboration with universities and think-tanks to better measure real-world impact.',
          'Openness to new participation models: one-off donations, solidarity legacies and corporate giving.',
        ],
      },
    ],
  },
  fr: {
    badge: 'Comment nous agissons',
    title: 'Notre stratégie',
    subtitle: 'Unaria opère sur six piliers stratégiques qui garantissent que chaque euro collecté génère le maximum d\'impact social possible.',
    pillars: [
      {
        number: '01',
        icon: <Heart className="w-7 h-7" />,
        accent: 'text-rose-600',
        bg: 'bg-rose-50',
        border: 'border-rose-100',
        title: 'Cotisations mensuelles récurrentes',
        subtitle: 'Financement stable et prévisible',
        points: [
          'Modèle d\'abonnement mensuel à partir de 6€/mois permettant de planifier l\'aide à long terme.',
          'La récurrence élimine l\'incertitude du financement saisonnier et garantit des fonds continus.',
          'Chaque membre choisit sa cotisation : 6€, 10€, 12€, 15€, 20€, 25€, 30€ ou personnalisée.',
          'Les cotisations sont gérées via SEPA ou carte bancaire avec sécurité bancaire complète.',
        ],
      },
      {
        number: '02',
        icon: <Target className="w-7 h-7" />,
        accent: 'text-brand-blue',
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        title: 'Sélection rigoureuse des ONG',
        subtitle: 'Uniquement des entités auditées et accréditées',
        points: [
          'Critères de sélection basés sur le bilan d\'impact, les audits externes et l\'accréditation officielle.',
          'Évaluation annuelle de chaque ONG partenaire : efficacité, transparence et portée des projets.',
          'Diversification par zones géographiques et types d\'action humanitaire.',
          'Nous exigeons des rapports annuels avec des indicateurs d\'impact vérifiables pour chaque projet financé.',
        ],
      },
      {
        number: '03',
        icon: <BarChart3 className="w-7 h-7" />,
        accent: 'text-brand-teal',
        bg: 'bg-teal-50',
        border: 'border-teal-100',
        title: 'Distribution optimisée du fonds',
        subtitle: 'Priorisation intelligente des projets',
        points: [
          'Les fonds sont alloués stratégiquement aux zones et projets où le besoin est le plus critique.',
          'Nous priorisons les interventions ayant une capacité prouvée à générer des changements réels à long terme.',
          'Nous maintenons les coûts opérationnels au strict minimum afin qu\'un maximum de fonds parvienne aux bénéficiaires.',
          'La distribution est continuellement réévaluée en fonction des urgences mondiales et des résultats des ONG partenaires.',
        ],
      },
      {
        number: '04',
        icon: <Eye className="w-7 h-7" />,
        accent: 'text-purple-600',
        bg: 'bg-purple-50',
        border: 'border-purple-100',
        title: 'Transparence radicale',
        subtitle: 'Comptes ouverts et vérifiables',
        points: [
          'Publication trimestrielle de tous les transferts effectués, avec montants et références.',
          'Accès public au portail de transparence sans inscription requise.',
          'Audit externe annuel par un cabinet indépendant accrédité.',
          'Rapport d\'impact annuel avec des données concrètes sur les bénéficiaires, projets et résultats.',
        ],
      },
      {
        number: '05',
        icon: <Globe className="w-7 h-7" />,
        accent: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-100',
        title: 'Croissance de la communauté',
        subtitle: 'Solidarité organisée à grande échelle',
        points: [
          'Stratégie de croissance organique basée sur la confiance et le bouche-à-oreille entre membres.',
          'Programme de parrainage : chaque membre peut inviter des contacts et amplifier l\'impact collectif.',
          'Disponible en cinq langues (ca/es/en/fr/de) pour se développer sur les marchés européens.',
          'Plus de membres signifie un fonds plus important et un plus grand pouvoir de négociation avec les ONG.',
        ],
      },
      {
        number: '06',
        icon: <Lightbulb className="w-7 h-7" />,
        accent: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-100',
        title: 'Innovation et amélioration continue',
        subtitle: 'Adaptation constante au contexte mondial',
        points: [
          'Révision annuelle des critères de sélection des ONG en fonction des crises humanitaires actives.',
          'Adoption de technologies pour réduire les coûts opérationnels et améliorer l\'expérience des membres.',
          'Collaboration avec des universités et think-tanks pour mieux mesurer l\'impact réel.',
          'Ouverture à de nouveaux modèles de participation : dons ponctuels, legs solidaires et entreprises.',
        ],
      },
    ],
  },
  de: {
    badge: 'Wie wir handeln',
    title: 'Unsere Strategie',
    subtitle: 'Unaria arbeitet auf der Grundlage von sechs strategischen Säulen, die sicherstellen, dass jeder gesammelte Euro den größtmöglichen sozialen Einfluss erzeugt.',
    pillars: [
      {
        number: '01',
        icon: <Heart className="w-7 h-7" />,
        accent: 'text-rose-600',
        bg: 'bg-rose-50',
        border: 'border-rose-100',
        title: 'Wiederkehrende Monatsbeiträge',
        subtitle: 'Stabile und planbare Finanzierung',
        points: [
          'Monatliches Abonnementmodell ab 6€/Monat für langfristige Hilfeplanung.',
          'Wiederkehrende Zahlungen eliminieren saisonale Finanzierungsunsicherheit.',
          'Jedes Mitglied wählt seinen Beitrag: 6€, 10€, 12€, 15€, 20€, 25€, 30€ oder individuell.',
          'Beiträge per SEPA oder Kreditkarte mit vollständiger Bankensicherheit.',
        ],
      },
      {
        number: '02',
        icon: <Target className="w-7 h-7" />,
        accent: 'text-brand-blue',
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        title: 'Strenge NGO-Auswahl',
        subtitle: 'Nur geprüfte, akkreditierte Organisationen',
        points: [
          'Auswahlkriterien basierend auf Wirkungsnachweis, externen Prüfungen und offizieller Akkreditierung.',
          'Jährliche Bewertung jeder Partner-NGO: Effizienz, Transparenz und Projektreichweite.',
          'Diversifizierung nach geografischen Gebieten und Arten humanitärer Maßnahmen.',
          'Wir fordern Jahresberichte mit nachprüfbaren Wirkungsindikatoren für jedes finanzierte Projekt.',
        ],
      },
      {
        number: '03',
        icon: <BarChart3 className="w-7 h-7" />,
        accent: 'text-brand-teal',
        bg: 'bg-teal-50',
        border: 'border-teal-100',
        title: 'Optimierte Fondsverteilung',
        subtitle: 'Intelligente Projektpriorisierung',
        points: [
          'Die Mittel werden strategisch den Bereichen und Projekten zugewiesen, in denen der Bedarf am dringendsten ist.',
          'Wir priorisieren Interventionen mit einer nachgewiesenen Fähigkeit, echte langfristige Veränderungen zu bewirken.',
          'Die Betriebskosten werden auf ein absolutes Minimum reduziert, damit ein Maximum an Spenden die Begünstigten erreicht.',
          'Die Verteilung wird kontinuierlich auf der Grundlage globaler Dringlichkeiten und der Ergebnisse der Partner-NGOs neu bewertet.',
        ],
      },
      {
        number: '04',
        icon: <Eye className="w-7 h-7" />,
        accent: 'text-purple-600',
        bg: 'bg-purple-50',
        border: 'border-purple-100',
        title: 'Radikale Transparenz',
        subtitle: 'Offene, überprüfbare Konten',
        points: [
          'Vierteljährliche Veröffentlichung aller getätigten Überweisungen mit Beträgen und Referenzen.',
          'Öffentlicher Zugang zum Transparenzportal — keine Registrierung erforderlich.',
          'Jährliche externe Prüfung durch ein akkreditiertes unabhängiges Unternehmen.',
          'Jährlicher Wirkungsbericht mit konkreten Daten zu Begünstigten, Projekten und Ergebnissen.',
        ],
      },
      {
        number: '05',
        icon: <Globe className="w-7 h-7" />,
        accent: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-100',
        title: 'Gemeinschaftswachstum',
        subtitle: 'Organisierte Solidarität im großen Maßstab',
        points: [
          'Organische Wachstumsstrategie auf Basis von Vertrauen und Mundpropaganda unter Mitgliedern.',
          'Empfehlungsprogramm: jedes Mitglied kann Kontakte einladen und die kollektive Wirkung erweitern.',
          'Verfügbar in fünf Sprachen (ca/es/en/fr/de) für europaweites Wachstum.',
          'Mehr Mitglieder bedeutet größere Fonds und mehr Verhandlungsmacht mit NGOs.',
        ],
      },
      {
        number: '06',
        icon: <Lightbulb className="w-7 h-7" />,
        accent: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-100',
        title: 'Innovation und kontinuierliche Verbesserung',
        subtitle: 'Ständige Anpassung an den globalen Kontext',
        points: [
          'Jährliche Überprüfung der NGO-Auswahlkriterien basierend auf aktiven humanitären Krisen.',
          'Technologieeinsatz zur Senkung der Betriebskosten und Verbesserung der Mitgliedererfahrung.',
          'Zusammenarbeit mit Universitäten und Think-Tanks zur besseren Messung realer Wirkung.',
          'Offenheit für neue Beteiligungsmodelle: Einzelspenden, Solidaritätsvermächtnisse und Unternehmen.',
        ],
      },
    ],
  },
}

export default async function StrategyPage({ params: { locale } }: PageProps) {
  const lang = ['ca', 'es', 'en', 'fr', 'de'].includes(locale) ? locale : 'ca'
  const data = content[lang]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue via-brand-blue to-brand-blue-light py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
            <Shield className="w-4 h-4" />
            {data.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
            {data.title}
          </h1>
          <p className="text-blue-100 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 sm:space-y-10">
            {data.pillars.map((pillar, i) => (
              <div
                key={i}
                className={`rounded-2xl border ${pillar.border} bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden`}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Left accent bar + number */}
                  <div className={`${pillar.bg} flex sm:flex-col items-center sm:items-center justify-between sm:justify-start gap-4 sm:gap-0 px-6 py-5 sm:px-8 sm:py-8 sm:w-36 flex-shrink-0`}>
                    <div className={`${pillar.accent} ${pillar.bg} w-12 h-12 rounded-xl flex items-center justify-center`}>
                      {pillar.icon}
                    </div>
                    <span className={`text-4xl sm:text-5xl font-extrabold ${pillar.accent} opacity-20 sm:mt-4`}>
                      {pillar.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8 flex-1">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1">
                      {pillar.title}
                    </h2>
                    <p className={`text-sm font-semibold ${pillar.accent} mb-5`}>
                      {pillar.subtitle}
                    </p>
                    <ul className="space-y-3">
                      {pillar.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                          <span className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${pillar.bg} border-2 ${pillar.border}`} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
