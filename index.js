
const express = require("express");
const app = express();

app.use(express.json());

const jadwal = {
  senin: [
    { waktu: "08:10-10:10", mapel: "agama  hindu" },
    { waktu: "10:40-15:00", mapel: "dasar-dasar akuntansi" },
  ],
  selasa: [
    { waktu: ":07:30-09:30", mapel: "pjok" },
    { waktu: "09:30-11:20", mapel: "matematika" },
    { waktu: "11:20-15:40", mapel: "ipas" }
  ],
  rabu: [
    { waktu: "07:30-08:50", mapel: "Matematika" },
    { waktu: "08:50-13:20", mapel: "dasar-dasar akuntansi" },
    { waktu: "13:40-15:00", mapel: "kka" }
  ],
  kamis: [
    { waktu: "07:30-08:50", mapel: "bahasa indonesia" },
    { waktu: "08:50-12:00", mapel: "informatika" },
    { waktu: "12:00-15:00", mapel: "bahasa inggris" },
     { waktu: "15:00-15:40", mapel: "bk" }
  ],
  jumat: [
    { waktu: "08:10-09:30", mapel: "seni budaya" },
    { waktu: "09:30-11:20", mapel: "PKN" },
    { waktu: "11:20-12:40", mapel: "bahasa indonesia" },
    { waktu: "12:40-14:20", mapel: "bahasa bali" },
    { waktu: "14:20-15:40", mapel: "matematika" },
  ]
};

app.post("/webhook", (req, res) => {
  const hari = req.body.queryResult.parameters.hari;

  if (jadwal[hari]) {
    const hasil = jadwal[hari]
      .map(j => `${j.waktu} ${j.mapel}`)
      .join(", ");

    res.json({
      fulfillmentText: `Jadwal hari ${hari}: ${hasil}`
    });
  } else {
    res.json({
      fulfillmentText: "Maaf, jadwal hanya tersedia Senin sampai Jumat."
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Webhook aktif"));
