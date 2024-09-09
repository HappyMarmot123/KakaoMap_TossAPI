const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");

// TODO: 개발자센터에 로그인해서 내 결제위젯 연동 키 > 시크릿 키를 입력하세요. 시크릿 키는 외부에 공개되면 안돼요.
// @docs https://docs.tosspayments.com/reference/using-api/api-keys
const secretKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

// 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
// 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
// @docs https://docs.tosspayments.com/reference/using-api/authorization#%EC%9D%B8%EC%A6%9D
const encryptedSecretKey =
  "Basic " + Buffer.from(secretKey + ":").toString("base64");

// 결제 승인
app.post("/confirm", function (req, res) {
  const { paymentKey, orderId, amount } = req.body;

  // 결제 승인 API를 호출하세요.
  // 결제를 승인하면 결제수단에서 금액이 차감돼요.
  // @docs https://docs.tosspayments.com/guides/v2/payment-widget/integration#3-결제-승인하기
  fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      Authorization: encryptedSecretKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderId: orderId,
      amount: amount,
      paymentKey: paymentKey,
    }),
  }).then(async function (response) {
    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      // TODO: 결제 승인 실패 비즈니스 로직을 구현하세요.
      res.status(response.status).json(result);

      return;
    }

    // TODO: 결제 완료 비즈니스 로직을 구현하세요.
    res.status(response.status).json(result);
  });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} 으로 API 서버가 실행되었습니다.`);
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "../../react-app/build")));
app.use(cors());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../../react-app/build", "index.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../../react-app/build", "index.html"));
});
