import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

async function main() {
  await db.product.create({
    data: {
      slug: 'aegis-x100',
      coverUrl: 'https://images.unsplash.com/photo-1581093804728-1e7e33c7b8a0?q=80&w=1200&auto=format&fit=crop',
      titleTr: 'AEGISTIC X100 Sensör Modülü',
      descTr: 'Endüstriyel sınıf, düşük gürültülü, geniş çalışma aralıklı sensör modülü. IP67 gövde, genişletilmiş sıcaklık aralığı.',
      specsTr: '<ul><li>Besleme: 9–36V DC</li><li>Arabirim: RS485/Modbus</li><li>Çalışma Sıcaklığı: −40…+85°C</li><li>Kasa: IP67</li></ul>',
      photos: { create: [
        { url: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop' },
        { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop' }
      ] },
      translations: {
        create: [
          { lang: 'en', title: 'AEGISTIC X100 Sensor Module', desc: 'Industrial-grade, low-noise, wide operating range sensor module. IP67 enclosure, extended temperature.', specs: '<ul><li>Supply: 9–36V DC</li><li>Interface: RS485/Modbus</li><li>Temp: −40…+85°C</li><li>Enclosure: IP67</li></ul>' },
          { lang: 'ar', title: 'وحدة المستشعر AEGISTIC X100', desc: 'وحدة مستشعر صناعية منخفضة الضوضاء بنطاق تشغيل واسع. غلاف IP67 ونطاق حرارة ممتد.', specs: '<ul><li>الطاقة: 9–36V DC</li><li>الواجهة: RS485/Modbus</li><li>الحرارة: −40…+85°C</li><li>الغلاف: IP67</li></ul>' },
          { lang: 'ru', title: 'Датчик AEGISTIC X100', desc: 'Промышленный датчик с низким шумом и широким диапазоном работы. Корпус IP67, расширенный температурный диапазон.', specs: '<ul><li>Питание: 9–36V DC</li><li>Интерфейс: RS485/Modbus</li><li>Темп.: −40…+85°C</li><li>Корпус: IP67</li></ul>' },
          { lang: 'fr', title: 'Module capteur AEGISTIC X100', desc: "Module capteur industriel à faible bruit et large plage de fonctionnement. Boîtier IP67, température étendue.", specs: '<ul><li>Alimentation : 9–36V DC</li><li>Interface : RS485/Modbus</li><li>Temp. : −40…+85°C</li><li>Boîtier : IP67</li></ul>' }
        ]
      }
    }
  })

  await db.project.create({
    data: {
      slug: 'factory-monitoring-2025',
      coverUrl: 'https://images.unsplash.com/photo-1581093588401-16c61b1f2b1a?q=80&w=1200&auto=format&fit=crop',
      titleTr: 'Fabrika İzleme Sistemi 2025',
      descTr: 'Gerçek zamanlı veri toplayan, alarm ve raporlama modülleri olan uçtan uca fabrika izleme projesi.',
      photos: { create: [
        { url: 'https://images.unsplash.com/photo-1585079542156-2755d9b90472?q=80&w=1200&auto=format&fit=crop' }
      ] },
      translations: {
        create: [
          { lang: 'en', title: 'Factory Monitoring System 2025', desc: 'End-to-end factory monitoring with real-time data acquisition, alarms and reporting.' },
          { lang: 'ar', title: 'نظام مراقبة المصنع 2025', desc: 'مراقبة شاملة للمصنع مع جمع بيانات فوري وإنذارات وتقارير.' },
          { lang: 'ru', title: 'Система мониторинга завода 2025', desc: 'Комплексный мониторинг с реальным временем, тревогами и отчётами.' },
          { lang: 'fr', title: 'Système de surveillance d’usine 2025', desc: 'Surveillance de bout en bout avec acquisition temps réel, alarmes et rapports.' }
        ]
      }
    }
  })
}

main().then(()=>db.$disconnect()).catch(async e=>{ console.error(e); await db.$disconnect(); process.exit(1) })
