import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { ChangeEvent, useEffect, useLayoutEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Shop {
  id: number;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
}

export default function Main() {
  const products: Product[] = [
    { id: 1, name: "기계식 키보드", price: 13000 },
    { id: 2, name: "마우스", price: 20000 },
  ];

  const shops: Shop[] = [
    {
      id: 1,
      name: "파묘몰",
      address: "경기도 성남시",
      location: { latitude: 37.4133, longitude: 127.0982 },
    },
    {
      id: 2,
      name: "코엑스몰",
      address: "서울 삼성동",
      location: { latitude: 37.5118, longitude: 127.0593 },
    },
  ];

  const [choose, setChoose] = useState(0);

  const handleChoose = (e: ChangeEvent<HTMLSelectElement>) => {
    const elem = e.target.value;
    setChoose(Number(elem));
  };

  return (
    <>
      <header>
        <h1>My Shopping Site</h1>
        <nav style={{ justifyContent: "space-evenly" }}>
          <select onChange={handleChoose}>
            {shops.length > 0 &&
              shops.map((item, index) => (
                <option key={item.id} value={index}>
                  {item.name}
                </option>
              ))}
          </select>
          <MapContainer shops={shops} choose={choose} />
        </nav>
      </header>
      <div>
        <h2>재고 있는 상품 리스트</h2>
        <div>
          {products.map((product) => (
            <div key={product.id} className="product-box">
              <h3>{product.name}</h3>
              <p>{product.price.toLocaleString()}원</p>
              <Link to={"/checkout"} state={{ product }}>
                Buy It
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

interface MapContainerProps {
  shops: Shop[];
  choose: number;
}

const MapContainer: React.FC<MapContainerProps> = ({ shops, choose }) => {
  var container = document.getElementById("map") as HTMLElement;
  const [map, setMap] = useState<any>();
  const [lat, setLat] = useState<any>();
  const [lng, setLng] = useState<any>();
  const [name, setName] = useState<string>();
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    setLat(shops[choose].location.latitude);
    setLng(shops[choose].location.longitude);
    setName(shops[choose].name);
    setAddress(shops[choose].address);
  }, [shops, choose]);

  useEffect(() => {
    var options = {
      center: new kakao.maps.LatLng(lat, lng), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    if (container) {
      setMap(new kakao.maps.Map(container, options));
    }
  }, [lat, lng, container]);

  // 라벨
  var mLabel = new kakao.maps.InfoWindow({
    position: new kakao.maps.LatLng(lat, lng),
    content: `<div style="color: black">${name}, ${address}</div>`,
  });

  useEffect(() => {
    if (map) {
      // 마커
      var mMarker: any = null;
      mMarker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(lat, lng),
      });
      mLabel.open(map, mMarker);
    }
  }, [map]);

  return (
    <div
      id="map"
      style={{
        width: "700px",
        height: "300px",
        backgroundColor: "white",
        border: "1px solid gray",
      }}
    />
  );
};
