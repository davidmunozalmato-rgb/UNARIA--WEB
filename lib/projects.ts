export interface Project {
  id: string
  entity: string
  entityColor: string
  image: string
  imageAlt: Record<string, string>
  titles: Record<string, string>
  descs: Record<string, string>
}

export const projects: Project[] = [
  {
    id: 'cruzroja-mayores',
    entity: 'Cruz Roja',
    entityColor: 'bg-red-100 text-red-700',
    image: '/images/projects/elderly-care.png',
    imageAlt: {
      ca: 'Atenció a persones grans',
      es: 'Atención a personas mayores',
      en: 'Elderly care',
      fr: 'Soins aux personnes âgées',
      de: 'Seniorenbetreuung',
    },
    titles: {
      ca: 'Cap persona gran sola',
      es: 'Ninguna persona mayor sola',
      en: 'No elderly person left alone',
      fr: 'Aucune personne âgée seule',
      de: 'Kein älterer Mensch allein',
    },
    descs: {
      ca: 'Acompanyament i suport a persones grans en situació d\'aïllament social.',
      es: 'Acompañamiento y apoyo a personas mayores en situación de aislamiento social.',
      en: 'Companionship and support for elderly people facing social isolation.',
      fr: 'Accompagnement et soutien aux personnes âgées en situation d\'isolement social.',
      de: 'Begleitung und Unterstützung älterer Menschen in sozialer Isolation.',
    },
  },
  {
    id: 'cruzroja-pobreza',
    entity: 'Cruz Roja',
    entityColor: 'bg-red-100 text-red-700',
    image: '/images/projects/food-poverty.png',
    imageAlt: {
      ca: 'Distribució d\'aliments',
      es: 'Distribución de alimentos',
      en: 'Food distribution',
      fr: 'Distribution alimentaire',
      de: 'Lebensmittelverteilung',
    },
    titles: {
      ca: 'Ajuda a famílies en pobresa extrema',
      es: 'Ayuda a familias en pobreza extrema',
      en: 'Aid for families in extreme poverty',
      fr: 'Aide aux familles en grande pauvreté',
      de: 'Hilfe für Familien in extremer Armut',
    },
    descs: {
      ca: 'Cobertura de necessitats bàsiques: alimentació, habitatge i accés a serveis essencials.',
      es: 'Cobertura de necesidades básicas: alimentación, vivienda y acceso a servicios esenciales.',
      en: 'Covering basic needs: food, shelter and access to essential services.',
      fr: 'Couverture des besoins essentiels : alimentation, logement et accès aux services.',
      de: 'Deckung der Grundbedürfnisse: Nahrung, Unterkunft und Zugang zu Grundleistungen.',
    },
  },
  {
    id: 'caritas-familias',
    entity: 'Cáritas',
    entityColor: 'bg-yellow-100 text-yellow-700',
    image: '/images/projects/vulnerable-families.png',
    imageAlt: {
      ca: 'Suport a famílies vulnerables',
      es: 'Apoyo a familias vulnerables',
      en: 'Support for vulnerable families',
      fr: 'Soutien aux familles vulnérables',
      de: 'Unterstützung gefährdeter Familien',
    },
    titles: {
      ca: 'Famílies en risc d\'exclusió',
      es: 'Familias en riesgo de exclusión',
      en: 'Families at risk of exclusion',
      fr: 'Familles en risque d\'exclusion',
      de: 'Familien in Ausgrenzungsgefahr',
    },
    descs: {
      ca: 'Programes d\'inserció laboral, orientació social i suport econòmic per a famílies vulnerables.',
      es: 'Programas de inserción laboral, orientación social y apoyo económico para familias vulnerables.',
      en: 'Job placement programmes, social guidance and economic support for vulnerable families.',
      fr: 'Programmes d\'insertion professionnelle, orientation sociale et aide économique.',
      de: 'Arbeitsvermittlungsprogramme, Sozialberatung und finanzielle Unterstützung.',
    },
  },
  {
    id: 'caritas-refugiats',
    entity: 'Cáritas',
    entityColor: 'bg-yellow-100 text-yellow-700',
    image: '/images/projects/refugee-integration.png',
    imageAlt: {
      ca: 'Acollida de refugiats',
      es: 'Acogida de refugiados',
      en: 'Refugee welcome',
      fr: 'Accueil des réfugiés',
      de: 'Flüchtlingsaufnahme',
    },
    titles: {
      ca: 'Acollida i integració de refugiats',
      es: 'Acogida e integración de refugiados',
      en: 'Refugee welcome and integration',
      fr: 'Accueil et intégration des réfugiés',
      de: 'Aufnahme und Integration von Flüchtlingen',
    },
    descs: {
      ca: 'Allotjament, assessoria jurídica, classes d\'idioma i acompanyament per a persones refugiades.',
      es: 'Alojamiento, asesoría jurídica, clases de idioma y acompañamiento para personas refugiadas.',
      en: 'Housing, legal advice, language classes and support for refugees.',
      fr: 'Hébergement, conseil juridique, cours de langue et accompagnement pour réfugiés.',
      de: 'Unterkunft, Rechtsberatung, Sprachkurse und Begleitung für Geflüchtete.',
    },
  },
  {
    id: 'msf-medical',
    entity: 'Médicos Sin Fronteras',
    entityColor: 'bg-orange-100 text-orange-700',
    image: '/images/projects/medical-crisis.png',
    imageAlt: {
      ca: 'Atenció mèdica en zones de conflicte',
      es: 'Atención médica en zonas de conflicto',
      en: 'Medical care in conflict zones',
      fr: 'Soins médicaux en zones de conflit',
      de: 'Medizinische Versorgung in Konfliktgebieten',
    },
    titles: {
      ca: 'Atenció mèdica en zones de crisi',
      es: 'Atención médica en zonas de crisis',
      en: 'Medical care in crisis zones',
      fr: 'Soins médicaux en zones de crise',
      de: 'Medizinische Versorgung in Krisengebieten',
    },
    descs: {
      ca: 'Missions mèdiques d\'emergència en conflictes armats i catàstrofes naturals a tot el món.',
      es: 'Misiones médicas de emergencia en conflictos armados y catástrofes naturales en todo el mundo.',
      en: 'Emergency medical missions in armed conflicts and natural disasters worldwide.',
      fr: 'Missions médicales d\'urgence dans les conflits armés et les catastrophes naturelles.',
      de: 'Notfallmedizinische Einsätze bei bewaffneten Konflikten und Naturkatastrophen weltweit.',
    },
  },
  {
    id: 'savechildren-educacio',
    entity: 'Save the Children',
    entityColor: 'bg-green-100 text-green-700',
    image: '/images/projects/children-education.png',
    imageAlt: {
      ca: 'Infants en classe',
      es: 'Niños en clase',
      en: 'Children in class',
      fr: 'Enfants en classe',
      de: 'Kinder im Unterricht',
    },
    titles: {
      ca: 'Educació per a infants en crisi',
      es: 'Educación para niños en crisis',
      en: 'Education for children in crisis',
      fr: 'Éducation pour les enfants en crise',
      de: 'Bildung für Kinder in Krisengebieten',
    },
    descs: {
      ca: 'Escoles i programes educatius per a infants en zones de conflicte i desastre natural.',
      es: 'Escuelas y programas educativos para niños en zonas de conflicto y desastre natural.',
      en: 'Schools and educational programmes for children in conflict and disaster zones.',
      fr: 'Écoles et programmes éducatifs pour les enfants dans les zones de conflit et de catastrophe.',
      de: 'Schulen und Bildungsprogramme für Kinder in Konflikt- und Katastrophengebieten.',
    },
  },
  {
    id: 'water-access',
    entity: 'Oxfam',
    entityColor: 'bg-emerald-100 text-emerald-700',
    image: '/images/projects/water-access.png',
    imageAlt: {
      ca: 'Construcció de pous',
      es: 'Construcción de pozos',
      en: 'Well construction',
      fr: 'Construction de puits',
      de: 'Brunnenbau',
    },
    titles: {
      ca: 'Accés a aigua potable',
      es: 'Acceso a agua potable',
      en: 'Access to clean water',
      fr: 'Accès à l\'eau potable',
      de: 'Zugang zu sauberem Wasser',
    },
    descs: {
      ca: 'Instal·lació de sistemes d\'aigua segura i sanejament en comunitats rurals afectades per sequeres.',
      es: 'Instalación de sistemas de agua segura y saneamiento en comunidades rurales afectadas por sequías.',
      en: 'Installation of safe water and sanitation systems in rural communities affected by droughts.',
      fr: 'Installation de systèmes d\'eau potable et d\'assainissement dans les communautés rurales.',
      de: 'Installation von sicheren Wasser- und Sanitärsystemen in von Dürre betroffenen ländlichen Gemeinden.',
    },
  },
  {
    id: 'women-empowerment',
    entity: 'Vicenç Ferrer',
    entityColor: 'bg-pink-100 text-pink-700',
    image: '/images/projects/women-empowerment.jpg',
    imageAlt: {
      ca: 'Grup de dones treballant',
      es: 'Grupo de mujeres trabajando',
      en: 'Group of working women',
      fr: 'Groupe de femmes au travail',
      de: 'Gruppe arbeitender Frauen',
    },
    titles: {
      ca: 'Empoderament femení rural',
      es: 'Empoderamiento femenino rural',
      en: 'Rural women empowerment',
      fr: 'Autonomisation des femmes rurales',
      de: 'Stärkung von Frauen auf dem Land',
    },
    descs: {
      ca: 'Foment de cooperatives i independència econòmica per a dones en situació de vulnerabilitat a l\'Índia.',
      es: 'Fomento de cooperativas e independencia económica para mujeres en situación de vulnerabilidad en la India.',
      en: 'Promoting cooperatives and economic independence for vulnerable women in India.',
      fr: 'Promotion des coopératives et de l\'indépendance économique des femmes vulnérables en Inde.',
      de: 'Förderung von Kooperativen und wirtschaftlicher Unabhängigkeit für gefährdete Frauen in Indien.',
    },
  },
]

export const sectionTitles: Record<string, string> = {
  ca: 'Projectes on actua Unaria',
  es: 'Proyectos donde actúa Unaria',
  en: 'Projects where Unaria acts',
  fr: 'Projets où Unaria intervient',
  de: 'Projekte, wo Unaria tätig ist',
}

export const sectionSubtitles: Record<string, string> = {
  ca: 'A través de les quotes dels socis, donem suport a projectes concrets d\'ONGs acreditades',
  es: 'A través de las cuotas de los socios, apoyamos proyectos concretos de ONGs acreditadas',
  en: 'Through member fees, we support concrete projects from accredited NGOs',
  fr: 'Grâce aux cotisations des membres, nous soutenons des projets concrets d\'ONG accréditées',
  de: 'Durch Mitgliedsbeiträge unterstützen wir konkrete Projekte akkreditierter NGOs',
}

export const donateLabels: Record<string, string> = {
  ca: 'Fes una donació',
  es: 'Haz una donación',
  en: 'Make a donation',
  fr: 'Faire un don',
  de: 'Jetzt spenden',
}

export const memberLabels: Record<string, string> = {
  ca: 'Fes-te soci',
  es: 'Hazte socio',
  en: 'Become a member',
  fr: 'Devenir membre',
  de: 'Mitglied werden',
}

export const viewAllProjectsLabels: Record<string, string> = {
  ca: 'Veure tots els projectes',
  es: 'Ver todos los proyectos',
  en: 'View all projects',
  fr: 'Voir tous les projets',
  de: 'Alle Projekte ansehen',
}
