const express = require("express");
const app = express();

app.use(express.json());

const jadwal = {
  senin: [
    { waktu: "08:00-09:00", mapel: "Matematika" },
    { waktu: "09:00-10:00", mapel: "Bahasa Indonesia" }
  ],
  selasa: [
    { waktu: "08:00-09:00", mapel: "IPA" }
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
      fulfillmentText: "Jadwal tidak ditemukan"
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server jalan"));
