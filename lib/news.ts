export interface Article {
  id: string
  slug: string
  date: { day: string; month: string; year: string; iso: string }
  image: string
  imageAlt: string
  titles: Record<string, string>
  excerpts: Record<string, string>
  bodies: Record<string, string>
}

export const articles: Article[] = [
  {
    id: 'sudan-crisis',
    slug: 'sudan-crisis',
    date: { day: '12', month: 'Mai', year: '2026', iso: '2026-05-12' },
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80',
    imageAlt: 'Persones en una crisi humanitària',
    titles: {
      ca: 'El Sudan viu la pitjor crisi humanitària del món: 11 milions de desplaçats',
      es: 'Sudán vive la peor crisis humanitaria del mundo: 11 millones de desplazados',
      en: 'Sudan faces the world\'s worst humanitarian crisis: 11 million displaced',
      fr: 'Le Soudan vit la pire crise humanitaire du monde : 11 millions de déplacés',
      de: 'Sudan erlebt die schlimmste humanitäre Krise der Welt: 11 Millionen Vertriebene',
    },
    excerpts: {
      ca: 'Des de l\'esclat del conflicte el 2023, el Sudan s\'ha convertit en l\'epicentre de la crisi de desplaçament global. Milions de persones han perdut les seves llars i accés a aliments, aigua potable i atenció mèdica bàsica.',
      es: 'Desde el estallido del conflicto en 2023, Sudán se ha convertido en el epicentro de la crisis de desplazamiento global. Millones de personas han perdido sus hogares y el acceso a alimentos, agua potable y atención médica básica.',
      en: 'Since the conflict erupted in 2023, Sudan has become the epicentre of the global displacement crisis. Millions have lost their homes and access to food, clean water and basic medical care.',
      fr: 'Depuis le déclenchement du conflit en 2023, le Soudan est devenu l\'épicentre de la crise mondiale de déplacement. Des millions de personnes ont perdu leurs foyers et l\'accès à la nourriture, à l\'eau potable et aux soins médicaux de base.',
      de: 'Seit dem Ausbruch des Konflikts im Jahr 2023 ist der Sudan zum Epizentrum der globalen Vertreibungskrise geworden. Millionen Menschen haben ihre Häuser und den Zugang zu Nahrung, sauberem Wasser und medizinischer Grundversorgung verloren.',
    },
    bodies: {
      ca: `El conflicte armat que va esclatar al Sudan l'abril de 2023 entre les Forces Armades del Sudan (SAF) i les Forces de Suport Ràpid (RSF) ha provocat la crisi humanitària més greu del planeta. Amb més d'11 milions de persones desplaçades internament i quasi 2 milions de refugiats als països veïns, la situació supera en magnitud altres crisis globals.

Les regions de Darfur, Kordofan i Khartum han estat les més afectades. Les infraestructures sanitàries han quedat destruïdes en gran part, deixant sense atenció mèdica milions de persones. L'accés a l'aigua potable s'ha reduït dràsticament en moltes zones, augmentant el risc d'epidèmies.

Segons l'ONU, més de 25 milions de persones —més de la meitat de la població del país— necessiten assistència humanitària urgent. La malnutrició aguda afecta especialment la infància, amb xifres que superen el llindar d'emergència en diverses regions.

El bloqueig de corredors humanitaris per part de les parts en conflicte dificulta enormement l'arribada d'ajuda. La comunitat internacional ha demanat repetidament un alto el foc per permetre l'accés humanitari, fins ara sense resultats definitius.

La crisi sudanesa és un exemple del que succeeix quan la violència armada, la pobresa estructural i el canvi climàtic convergeixen en un mateix territori, amplificant l'impacte sobre les poblacions més vulnerables.`,

      es: `El conflicto armado que estalló en Sudán en abril de 2023 entre las Fuerzas Armadas del Sudán (SAF) y las Fuerzas de Apoyo Rápido (RSF) ha provocado la crisis humanitaria más grave del planeta. Con más de 11 millones de personas desplazadas internamente y casi 2 millones de refugiados en países vecinos, la situación supera en magnitud otras crisis globales.

Las regiones de Darfur, Kordofán y Jartum han sido las más afectadas. Las infraestructuras sanitarias han quedado destruidas en gran parte, dejando sin atención médica a millones de personas. El acceso al agua potable se ha reducido drásticamente en muchas zonas, aumentando el riesgo de epidemias.

Según la ONU, más de 25 millones de personas —más de la mitad de la población del país— necesitan asistencia humanitaria urgente. La desnutrición aguda afecta especialmente a la infancia, con cifras que superan el umbral de emergencia en varias regiones.

El bloqueo de corredores humanitarios por parte de las partes en conflicto dificulta enormemente la llegada de ayuda. La comunidad internacional ha pedido repetidamente un alto el fuego para permitir el acceso humanitario, hasta ahora sin resultados definitivos.

La crisis sudanesa es un ejemplo de lo que sucede cuando la violencia armada, la pobreza estructural y el cambio climático convergen en un mismo territorio, amplificando el impacto sobre las poblaciones más vulnerables.`,

      en: `The armed conflict that erupted in Sudan in April 2023 between the Sudanese Armed Forces (SAF) and the Rapid Support Forces (RSF) has triggered the world's most severe humanitarian crisis. With over 11 million internally displaced people and nearly 2 million refugees in neighbouring countries, the situation surpasses other global crises in scale.

The regions of Darfur, Kordofan and Khartoum have been the worst affected. Health infrastructure has been largely destroyed, leaving millions without medical care. Access to clean water has fallen sharply in many areas, raising the risk of epidemics.

According to the UN, more than 25 million people — over half the country's population — need urgent humanitarian assistance. Acute malnutrition is particularly affecting children, with figures exceeding emergency thresholds in several regions.

The blocking of humanitarian corridors by the warring parties severely hampers the delivery of aid. The international community has repeatedly called for a ceasefire to allow humanitarian access, so far without definitive results.

The Sudanese crisis is an example of what happens when armed violence, structural poverty and climate change converge in the same territory, amplifying the impact on the most vulnerable populations.`,

      fr: `Le conflit armé qui a éclaté au Soudan en avril 2023 entre les Forces armées soudanaises (SAF) et les Forces de soutien rapide (RSF) a déclenché la crise humanitaire la plus grave de la planète. Avec plus de 11 millions de personnes déplacées en interne et près de 2 millions de réfugiés dans les pays voisins, la situation dépasse en ampleur d'autres crises mondiales.

Les régions du Darfour, du Kordofan et de Khartoum ont été les plus touchées. Les infrastructures sanitaires ont été largement détruites, privant des millions de personnes de soins médicaux. L'accès à l'eau potable a fortement diminué dans de nombreuses zones, augmentant le risque d'épidémies.

Selon l'ONU, plus de 25 millions de personnes — plus de la moitié de la population du pays — ont besoin d'une assistance humanitaire urgente. La malnutrition aiguë touche particulièrement les enfants, avec des chiffres dépassant les seuils d'urgence dans plusieurs régions.

Le blocage des couloirs humanitaires par les parties au conflit entrave considérablement l'acheminement de l'aide. La communauté internationale a répété ses appels à un cessez-le-feu pour permettre l'accès humanitaire, jusqu'à présent sans résultats définitifs.

La crise soudanaise illustre ce qui se passe quand la violence armée, la pauvreté structurelle et le changement climatique convergent sur un même territoire, amplifiant l'impact sur les populations les plus vulnérables.`,

      de: `Der im April 2023 im Sudan ausgebrochene bewaffnete Konflikt zwischen den Sudanesischen Streitkräften (SAF) und den Rapid Support Forces (RSF) hat die schwerste humanitäre Krise der Welt ausgelöst. Mit über 11 Millionen Binnenvertriebenen und fast 2 Millionen Flüchtlingen in Nachbarländern übertrifft die Situation andere globale Krisen in ihrer Dimension.

Die Regionen Darfur, Kordofan und Khartum sind am stärksten betroffen. Die Gesundheitsinfrastruktur wurde größtenteils zerstört, sodass Millionen von Menschen ohne medizinische Versorgung sind. Der Zugang zu sauberem Wasser ist in vielen Gebieten drastisch gesunken, was das Risiko von Epidemien erhöht.

Laut UN benötigen mehr als 25 Millionen Menschen — über die Hälfte der Bevölkerung des Landes — dringend humanitäre Hilfe. Akute Unterernährung betrifft besonders Kinder, mit Zahlen, die in mehreren Regionen die Notfallschwellen überschreiten.

Die Blockade humanitärer Korridore durch die Konfliktparteien erschwert die Hilfslieferungen erheblich. Die internationale Gemeinschaft hat wiederholt einen Waffenstillstand gefordert, um humanitären Zugang zu ermöglichen, bisher ohne endgültige Ergebnisse.

Die sudanesische Krise ist ein Beispiel dafür, was passiert, wenn bewaffnete Gewalt, strukturelle Armut und Klimawandel im selben Gebiet zusammentreffen und die Auswirkungen auf die verletzlichsten Bevölkerungsgruppen verstärken.`,
    },
  },
  {
    id: 'hunger-sahel',
    slug: 'hunger-sahel',
    date: { day: '28', month: 'Abr', year: '2026', iso: '2026-04-28' },
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80',
    imageAlt: 'Terra seca per la sequera',
    titles: {
      ca: 'La fam al Sahel s\'aguditza: 36 milions de persones en inseguretat alimentària greu',
      es: 'El hambre en el Sahel se agudiza: 36 millones de personas en inseguridad alimentaria grave',
      en: 'Hunger in the Sahel worsens: 36 million people facing severe food insecurity',
      fr: 'La faim au Sahel s\'aggrave : 36 millions de personnes en insécurité alimentaire grave',
      de: 'Hunger in der Sahel-Zone verschlimmert sich: 36 Millionen Menschen von schwerer Ernährungsunsicherheit betroffen',
    },
    excerpts: {
      ca: 'La combinació de sequeres extremes, conflictes armats i inestabilitat econòmica ha disparat els índexs de malnutrició en països com Mali, Burkina Faso i Níger.',
      es: 'La combinación de sequías extremas, conflictos armados e inestabilidad económica ha disparado los índices de malnutrición en países como Mali, Burkina Faso y Níger.',
      en: 'The combination of extreme droughts, armed conflicts and economic instability has driven up malnutrition rates in countries such as Mali, Burkina Faso and Niger.',
      fr: 'La combinaison de sécheresses extrêmes, de conflits armés et d\'instabilité économique a fait grimper les taux de malnutrition dans des pays comme le Mali, le Burkina Faso et le Niger.',
      de: 'Die Kombination aus extremen Dürren, bewaffneten Konflikten und wirtschaftlicher Instabilität hat die Unterernährungsraten in Ländern wie Mali, Burkina Faso und Niger in die Höhe getrieben.',
    },
    bodies: {
      ca: `La regió del Sahel africà traversa una de les crisis alimentàries més greus de la seva història recent. Segons les últimes estimacions, més de 36 milions de persones pateixen inseguretat alimentària severa al llarg de la franja que s'estén des del Senegal fins a Etiòpia.

La confluència de múltiples factors fa especialment difícil revertir la situació. Les sequeres recurrents, agreujades pel canvi climàtic, han reduït dràsticament les collites de subsistència. Al mateix temps, els conflictes armats actius a Mali, Burkina Faso, Níger i el nord de Nigèria han desplaçat pagesos de les seves terres i tallat les rutes comercials tradicionals.

La malnutrició aguda infantil ha assolit nivells d'emergència en diverses zones. A les regions del nord de Mali i l'est de Burkina Faso, les taxes de malnutrició aguda global (MAG) superen el 15%, el llindar d'emergència establert per l'OMS.

L'escalada de preus dels aliments, parcialment atribuïble a les repercussions globals de la guerra a Ucraïna sobre els mercats de cereals, ha agreujat l'accés als mercats locals per a les famílies amb menys recursos. El blat, el mill i el sorgo, bàsics de l'alimentació saheliana, s'han encarit notablement.

La manca d'inversió en infraestructures d'irrigació i la dependència de l'agricultura de secà fan que la regió sigui especialment vulnerable als canvis en els patrons de precipitació. Sense solucions estructurals que combinin seguretat, adaptació climàtica i desenvolupament econòmic, els experts adverteixen que les crisis alimentàries al Sahel seran cada cop més freqüents i intenses.`,

      es: `La región del Sahel africano atraviesa una de las crisis alimentarias más graves de su historia reciente. Según las últimas estimaciones, más de 36 millones de personas sufren inseguridad alimentaria severa a lo largo de la franja que se extiende desde Senegal hasta Etiopía.

La confluencia de múltiples factores hace especialmente difícil revertir la situación. Las sequías recurrentes, agravadas por el cambio climático, han reducido drásticamente las cosechas de subsistencia. Al mismo tiempo, los conflictos armados activos en Mali, Burkina Faso, Níger y el norte de Nigeria han desplazado a campesinos de sus tierras y cortado las rutas comerciales tradicionales.

La malnutrición aguda infantil ha alcanzado niveles de emergencia en varias zonas. En las regiones del norte de Mali y el este de Burkina Faso, las tasas de malnutrición aguda global (MAG) superan el 15%, el umbral de emergencia establecido por la OMS.

La escalada de precios de los alimentos, parcialmente atribuible a las repercusiones globales de la guerra en Ucrania sobre los mercados de cereales, ha agravado el acceso a los mercados locales para las familias con menos recursos. El trigo, el mijo y el sorgo, básicos de la alimentación saheliana, se han encarecido notablemente.

La falta de inversión en infraestructuras de irrigación y la dependencia de la agricultura de secano hacen que la región sea especialmente vulnerable a los cambios en los patrones de precipitación. Sin soluciones estructurales que combinen seguridad, adaptación climática y desarrollo económico, los expertos advierten que las crisis alimentarias en el Sahel serán cada vez más frecuentes e intensas.`,

      en: `The African Sahel region is experiencing one of the most severe food crises in its recent history. According to the latest estimates, more than 36 million people are suffering from severe food insecurity across the belt stretching from Senegal to Ethiopia.

The convergence of multiple factors makes the situation particularly difficult to reverse. Recurring droughts, worsened by climate change, have drastically reduced subsistence harvests. At the same time, active armed conflicts in Mali, Burkina Faso, Niger and northern Nigeria have displaced farmers from their land and cut traditional trade routes.

Acute child malnutrition has reached emergency levels in several areas. In the northern regions of Mali and eastern Burkina Faso, global acute malnutrition (GAM) rates exceed 15%, the emergency threshold set by the WHO.

Rising food prices, partly attributable to the global repercussions of the war in Ukraine on grain markets, have worsened market access for the poorest families. Wheat, millet and sorghum — staples of the Sahelian diet — have become significantly more expensive.

The lack of investment in irrigation infrastructure and dependence on rain-fed agriculture make the region especially vulnerable to changes in rainfall patterns. Without structural solutions combining security, climate adaptation and economic development, experts warn that food crises in the Sahel will become increasingly frequent and intense.`,

      fr: `La région du Sahel africain traverse l'une des crises alimentaires les plus graves de son histoire récente. Selon les dernières estimations, plus de 36 millions de personnes souffrent d'insécurité alimentaire sévère le long de la bande qui s'étend du Sénégal à l'Éthiopie.

La convergence de multiples facteurs rend la situation particulièrement difficile à inverser. Les sécheresses récurrentes, aggravées par le changement climatique, ont drastiquement réduit les récoltes de subsistance. Parallèlement, les conflits armés actifs au Mali, au Burkina Faso, au Niger et dans le nord du Nigéria ont déplacé des paysans de leurs terres et coupé les routes commerciales traditionnelles.

La malnutrition aiguë infantile a atteint des niveaux d'urgence dans plusieurs zones. Dans les régions du nord du Mali et de l'est du Burkina Faso, les taux de malnutrition aiguë globale (MAG) dépassent 15 %, le seuil d'urgence établi par l'OMS.

La hausse des prix alimentaires, partiellement attribuable aux répercussions mondiales de la guerre en Ukraine sur les marchés céréaliers, a aggravé l'accès aux marchés locaux pour les familles les moins aisées. Le blé, le mil et le sorgho — aliments de base de l'alimentation sahélienne — se sont considérablement renchéris.

Le manque d'investissement dans les infrastructures d'irrigation et la dépendance à l'agriculture pluviale rendent la région particulièrement vulnérable aux changements des régimes de précipitations. Sans solutions structurelles combinant sécurité, adaptation climatique et développement économique, les experts avertissent que les crises alimentaires au Sahel seront de plus en plus fréquentes et intenses.`,

      de: `Die afrikanische Sahelzone durchlebt eine der schwersten Ernährungskrisen ihrer jüngeren Geschichte. Schätzungen zufolge leiden mehr als 36 Millionen Menschen entlang des Gürtels von Senegal bis Äthiopien unter schwerer Ernährungsunsicherheit.

Das Zusammentreffen mehrerer Faktoren macht es besonders schwierig, die Situation umzukehren. Wiederkehrende Dürren, die durch den Klimawandel verschlimmert werden, haben die Subsistenzernte drastisch reduziert. Gleichzeitig haben aktive bewaffnete Konflikte in Mali, Burkina Faso, Niger und Nordnigeria Bauern von ihrem Land vertrieben und traditionelle Handelswege unterbrochen.

Akute Unterernährung bei Kindern hat in mehreren Gebieten Notfallniveau erreicht. In den nördlichen Regionen Malis und im Osten Burkina Fasos überschreiten die Raten globaler akuter Unterernährung (GAM) 15 %, die von der WHO festgelegte Notfallschwelle.

Der Anstieg der Lebensmittelpreise, der teilweise auf die globalen Auswirkungen des Krieges in der Ukraine auf die Getreidemärkte zurückzuführen ist, hat den Marktzugang für die ärmsten Familien verschlechtert. Weizen, Hirse und Sorghum — Grundnahrungsmittel der Sahelbevölkerung — sind deutlich teurer geworden.

Das Fehlen von Investitionen in Bewässerungsinfrastruktur und die Abhängigkeit vom Regenfeldbau machen die Region besonders anfällig für Veränderungen der Niederschlagsmuster. Ohne strukturelle Lösungen, die Sicherheit, Klimaanpassung und wirtschaftliche Entwicklung verbinden, warnen Experten, dass Ernährungskrisen im Sahel immer häufiger und intensiver werden.`,
    },
  },
  {
    id: 'climate-refugees',
    slug: 'climate-refugees',
    date: { day: '15', month: 'Abr', year: '2026', iso: '2026-04-15' },
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80',
    imageAlt: 'Persones desplaçades pel canvi climàtic',
    titles: {
      ca: 'El canvi climàtic genera nous refugiats: 26 milions de persones desplaçades anualment',
      es: 'El cambio climático genera nuevos refugiados: 26 millones de personas desplazadas anualmente',
      en: 'Climate change creates new refugees: 26 million people displaced annually',
      fr: 'Le changement climatique crée de nouveaux réfugiés : 26 millions de personnes déplacées chaque année',
      de: 'Klimawandel schafft neue Flüchtlinge: 26 Millionen Menschen jährlich vertrieben',
    },
    excerpts: {
      ca: 'Les inundacions, les onades de calor i les sequeres prolongades expulsen cada any milions de persones de les seves llars. Àsia del Sud i l\'Àfrica subsahariana concentren la majoria dels desplaçaments climàtics.',
      es: 'Las inundaciones, las olas de calor y las sequías prolongadas expulsan cada año millones de personas de sus hogares. El sur de Asia y el África subsahariana concentran la mayoría de los desplazamientos climáticos.',
      en: 'Floods, heatwaves and prolonged droughts force millions from their homes each year. South Asia and sub-Saharan Africa account for the majority of climate-related displacement.',
      fr: 'Les inondations, les vagues de chaleur et les sécheresses prolongées chassent chaque année des millions de personnes de leurs foyers. L\'Asie du Sud et l\'Afrique subsaharienne concentrent la majorité des déplacements climatiques.',
      de: 'Überschwemmungen, Hitzewellen und anhaltende Dürren zwingen jedes Jahr Millionen Menschen aus ihren Häusern. Südasien und das subsaharische Afrika verzeichnen die meisten klimabedingten Vertreibungen.',
    },
    bodies: {
      ca: `El canvi climàtic s'ha consolidat com un dels principals motors de desplaçament humà al segle XXI. Cada any, al voltant de 26 milions de persones es veuen obligades a abandonar les seves llars a causa de fenòmens meteorològics extrems directament relacionats amb l'escalfament global: inundacions devastadores, ciclons tropicals d'intensitat creixent, sequeres prolongades i onades de calor mortals.

A diferència dels refugiats de guerra, els desplaçats climàtics no estan reconeguts per cap marc jurídic internacional específic. La Convenció de Ginebra de 1951 no els empara, cosa que els deixa en un buit legal que dificulta la seva protecció i reinserció.

Àsia del Sud és la regió més afectada. Bangladesh, Pakistan i Índia concentren alguns dels episodis de desplaçament massiu més greus. Les inundacions monzòniques cada cop més intenses i la pujada del nivell del mar amenacen les zones costaneres i els deltes fluvials on viuen centenars de milions de persones.

A l'Àfrica subsahariana, la desertificació progressiva del Sahel i les inundacions ciclòpiques al Àfrica de l'Est combinen els seus efectes amb la pobresa estructural i la feblesa institucional, creant situacions de vulnerabilitat extrema.

Les projeccions científiques apunten que, sense una reducció dràstica de les emissions globals, el nombre de desplaçats climàtics podria arribar als 216 milions de persones el 2050, concentrats en sis regions del món: Àfrica subsahariana, Àsia del Sud i de l'Est, Àfrica del Nord, Amèrica Llatina i Europa de l'Est.

La comunitat internacional comença a reconèixer la urgència del problema. Diverses cimeres del clima han inclòs per primera vegada la qüestió dels desplaçaments en les seves agendes, però els compromisos concrets per protegir les persones afectades continuen sent insuficients.`,

      es: `El cambio climático se ha consolidado como uno de los principales motores de desplazamiento humano en el siglo XXI. Cada año, alrededor de 26 millones de personas se ven obligadas a abandonar sus hogares a causa de fenómenos meteorológicos extremos directamente relacionados con el calentamiento global: inundaciones devastadoras, ciclones tropicales de intensidad creciente, sequías prolongadas y olas de calor mortales.

A diferencia de los refugiados de guerra, los desplazados climáticos no están reconocidos por ningún marco jurídico internacional específico. La Convención de Ginebra de 1951 no les ampara, lo que les deja en un vacío legal que dificulta su protección y reinserción.

Asia del Sur es la región más afectada. Bangladesh, Pakistán e India concentran algunos de los episodios de desplazamiento masivo más graves. Las inundaciones monzónicas cada vez más intensas y la subida del nivel del mar amenazan las zonas costeras y los deltas fluviales donde viven cientos de millones de personas.

En el África subsahariana, la desertificación progresiva del Sahel y las inundaciones ciclópeas en África Oriental combinan sus efectos con la pobreza estructural y la debilidad institucional, creando situaciones de vulnerabilidad extrema.

Las proyecciones científicas apuntan a que, sin una reducción drástica de las emisiones globales, el número de desplazados climáticos podría alcanzar los 216 millones de personas en 2050, concentrados en seis regiones del mundo: África subsahariana, Asia del Sur y del Este, África del Norte, América Latina y Europa del Este.

La comunidad internacional comienza a reconocer la urgencia del problema. Varias cumbres del clima han incluido por primera vez la cuestión de los desplazamientos en sus agendas, pero los compromisos concretos para proteger a las personas afectadas siguen siendo insuficientes.`,

      en: `Climate change has established itself as one of the main drivers of human displacement in the 21st century. Each year, around 26 million people are forced to leave their homes due to extreme weather events directly linked to global warming: devastating floods, increasingly intense tropical cyclones, prolonged droughts and deadly heatwaves.

Unlike war refugees, climate displaced people are not recognised by any specific international legal framework. The 1951 Geneva Convention does not protect them, leaving them in a legal void that hampers their protection and reintegration.

South Asia is the worst-affected region. Bangladesh, Pakistan and India account for some of the most severe mass displacement episodes. Increasingly intense monsoon floods and rising sea levels threaten the coastal areas and river deltas where hundreds of millions of people live.

In sub-Saharan Africa, the progressive desertification of the Sahel and massive floods in East Africa combine their effects with structural poverty and institutional weakness, creating situations of extreme vulnerability.

Scientific projections indicate that without a drastic reduction in global emissions, the number of climate displaced people could reach 216 million by 2050, concentrated in six regions: sub-Saharan Africa, South and East Asia, North Africa, Latin America and Eastern Europe.

The international community is beginning to recognise the urgency of the problem. Several climate summits have for the first time included displacement on their agendas, but concrete commitments to protect affected people remain insufficient.`,

      fr: `Le changement climatique s'est imposé comme l'un des principaux moteurs de déplacement humain au XXIe siècle. Chaque année, environ 26 millions de personnes sont contraintes de quitter leurs foyers en raison de phénomènes météorologiques extrêmes directement liés au réchauffement climatique : inondations dévastatrices, cyclones tropicaux d'intensité croissante, sécheresses prolongées et vagues de chaleur meurtrières.

Contrairement aux réfugiés de guerre, les déplacés climatiques ne sont pas reconnus par un cadre juridique international spécifique. La Convention de Genève de 1951 ne les protège pas, les laissant dans un vide juridique qui entrave leur protection et leur réinsertion.

L'Asie du Sud est la région la plus touchée. Le Bangladesh, le Pakistan et l'Inde concentrent certains des épisodes de déplacement massif les plus graves. Des inondations monsounales de plus en plus intenses et la montée du niveau de la mer menacent les zones côtières et les deltas fluviaux où vivent des centaines de millions de personnes.

En Afrique subsaharienne, la désertification progressive du Sahel et les inondations colossales en Afrique de l'Est combinent leurs effets avec la pauvreté structurelle et la faiblesse institutionnelle, créant des situations de vulnérabilité extrême.

Les projections scientifiques indiquent que sans une réduction drastique des émissions mondiales, le nombre de déplacés climatiques pourrait atteindre 216 millions de personnes d'ici 2050, concentrées dans six régions du monde : Afrique subsaharienne, Asie du Sud et de l'Est, Afrique du Nord, Amérique latine et Europe de l'Est.

La communauté internationale commence à reconnaître l'urgence du problème. Plusieurs sommets sur le climat ont pour la première fois inclus la question des déplacements dans leurs agendas, mais les engagements concrets pour protéger les personnes affectées restent insuffisants.`,

      de: `Der Klimawandel hat sich als einer der Haupttreiber menschlicher Vertreibung im 21. Jahrhundert etabliert. Jedes Jahr sind rund 26 Millionen Menschen gezwungen, ihre Häuser aufgrund extremer Wetterereignisse zu verlassen, die direkt mit der globalen Erwärmung zusammenhängen: verheerende Überschwemmungen, immer intensivere Tropenzyklone, anhaltende Dürren und tödliche Hitzewellen.

Im Gegensatz zu Kriegsflüchtlingen werden klimabedingt Vertriebene von keinem spezifischen internationalen Rechtsrahmen anerkannt. Die Genfer Konvention von 1951 schützt sie nicht, was sie in einem rechtlichen Vakuum lässt, das ihren Schutz und ihre Wiedereingliederung erschwert.

Südasien ist die am stärksten betroffene Region. Bangladesch, Pakistan und Indien verzeichnen einige der schwersten Massenvertreibungen. Immer intensivere Monsunüberschwemmungen und steigende Meeresspiegel bedrohen Küstengebiete und Flussdeltas, in denen Hunderte von Millionen Menschen leben.

In Subsahara-Afrika kombinieren die fortschreitende Versteppung der Sahelzone und massive Überschwemmungen in Ostafrika ihre Auswirkungen mit struktureller Armut und institutioneller Schwäche und schaffen Situationen extremer Vulnerabilität.

Wissenschaftliche Prognosen deuten darauf hin, dass ohne eine drastische Reduzierung der globalen Emissionen die Zahl der klimabedingten Vertriebenen bis 2050 auf 216 Millionen ansteigen könnte, konzentriert in sechs Regionen: Subsahara-Afrika, Süd- und Ostasien, Nordafrika, Lateinamerika und Osteuropa.

Die internationale Gemeinschaft beginnt die Dringlichkeit des Problems anzuerkennen. Mehrere Klimagipfel haben die Frage der Vertreibung erstmals auf ihre Agenden gesetzt, aber konkrete Zusagen zum Schutz der Betroffenen bleiben unzureichend.`,
    },
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export const monthLabels: Record<string, Record<string, string>> = {
  ca: { Mai: 'Mai', Abr: 'Abr' },
  es: { Mai: 'May', Abr: 'Abr' },
  en: { Mai: 'May', Abr: 'Apr' },
  fr: { Mai: 'Mai', Abr: 'Avr' },
  de: { Mai: 'Mai', Abr: 'Apr' },
}

export const sectionTitles: Record<string, string> = {
  ca: 'Actualitat',
  es: 'Actualidad',
  en: 'News',
  fr: 'Actualités',
  de: 'Aktuelles',
}

export const readMoreLabels: Record<string, string> = {
  ca: 'Llegir més',
  es: 'Leer més',
  en: 'Read more',
  fr: 'Lire plus',
  de: 'Mehr lesen',
}
