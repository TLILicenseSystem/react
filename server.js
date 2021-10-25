const expess = require("express");
const axios = require("axios");
const path = require("path");
const qs = require("qs");
const app = expess();

// parse requests content-type.
app.use(expess.static(path.join(__dirname, "build")));

app.post("/api/token", expess.json());
app.post("/api/token", async (req, res) => {
  const { clint_id, clint_secret } = req.body;
  const url = "https://dev-sgi-api.thailife.com:8243";
  var config = {
    method: "post",
    url: `${url}/token?grant_type=client_credentials&client_id=CL08fHJqKSHqkTjqZz8xxyVfa7Ya&client_secret=zO38hilu9D93Qxv0XcAPY_mnSYQa`,
    data: qs.stringify({
      grant_type: "client_credentials",
      client_id: clint_id,
      client_secret: clint_secret,
    }),
  };
  const result = await axios(config);
  res.json(200, result.data);
});

app.get("/", (reg, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
