import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaUser, FaPhoneAlt, FaRupeeSign } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { AiOutlineGlobal } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";
import { IoTimeSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

function App() {
  const [map, setMap] = useState(null);
  const [isMap, setIsMap] = useState([]);

  useEffect(() => {
    const leafletMap = L.map("map").setView([0, 0], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(leafletMap);

    setMap(leafletMap);

    return () => {
      if (leafletMap) {
        leafletMap.remove();
      }
    };
  }, []);
  const updateMap = () => {
    const address = document.getElementById("address").value;

    const geocodingUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${address}`;
    fetch(geocodingUrl)
      .then((response) => response.json())
      .then((data) => {
        setIsMap(data);
        if (data.length > 0 && map) {
          const { lat, lon } = data[0];
          map.setView([lat, lon], 15);
          L.marker([lat, lon]).addTo(map);
        } else {
        }
      })
      .catch((error) => {
        console.error("Error fetching geocoding data:", error);
      });
  };
  const formHandler = (e) => {
    e.preventDefault();
    alert("Added lead");
  };
  return (
    <div className="container mx-auto px-2 lg:px-20 bg-background">
      <div className="flex justify-between mx-auto items-center py-4">
        <h1 className="font-bold text-xl lg:text-3xl">
          Magnabox Private limited
        </h1>
        <img src="/3sigma-logo.png" className="w-24 lg:w-40" alt="" />
      </div>
      <div className="flex justify-between items-center">
        <h2 className="lg:text-2xl font-semibold">Add new lead form</h2>
        <button className="px-6 outline-2 border border-gray rounded-lg py-2 text-red">
          Cancel
        </button>
      </div>
      <form className="lg:mt-20" onSubmit={formHandler}>
        <div className="pb-4 relative">
          <label htmlFor="LeadName" className="ps-2">
            <p className="normal-case">
              {" "}
              Lead name <span className="text-red">*</span>
            </p>
          </label>
          <input
            type="text"
            name="LeadName"
            id=""
            required
            placeholder="Enter lead name"
            className="input input-ghost w-full py-4 ps-8 lg:ps-10 rounded-lg"
          />
          <FaUser className="text-blue absolute bottom-9 left-2"></FaUser>
        </div>
        <div className="pb-4 relative">
          <label htmlFor="email" className="ps-2">
            Email ID <span className="text-red">*</span>
          </label>
          <input
            type="email"
            name="email"
            id=""
            required
            placeholder="Example@anyemail.com"
            className="input input-ghost w-full py-4 ps-8 lg:ps-10  rounded-lg"
          />
          <IoMdMail className="text-blue absolute bottom-9 left-2"></IoMdMail>
        </div>
        <div className="pb-4 relative">
          <label htmlFor="number" className="ps-2">
            Phone number <span className="text-red">*</span>
          </label>

          <input
            type="number"
            name="number"
            id=""
            required
            maxLength={13}
            placeholder="+91 8800688763"
            className="input input-ghost w-full py-4 ps-8 lg:ps-10  rounded-lg"
          />
          <FaPhoneAlt className="text-blue absolute bottom-9 left-2"></FaPhoneAlt>
        </div>
        <div className="pb-4 relative">
          <label htmlFor="address" className="ps-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Gugurgram, India"
            className="input input-ghost w-full py-4 ps-8 lg:ps-10  rounded-lg"
            onChange={updateMap}
          />
          <AiOutlineGlobal className="text-blue absolute bottom-9 left-2"></AiOutlineGlobal>
        </div>
        <div id="map" style={{ height: "220px" }}></div>

        <div className="pb-4 relative">
          <label htmlFor="SaleValue" className="ps-2">
            Sale value
          </label>{" "}
          <input
            type="number"
            name="SaleValue"
            id=""
            min={0}
            placeholder="50,00,000"
            className="input input-ghost w-full py-4 ps-8 lg:ps-10  rounded-lg"
          />
          <FaRupeeSign className="text-blue absolute bottom-9 left-2"></FaRupeeSign>
        </div>
        <div className="pb-4 relative">
          <label htmlFor="date" className="ps-2">
            Date
          </label>

          <input
            type="text"
            name="date"
            id="date"
            placeholder="29 August 2023"
            className="input input-ghost w-full py-4 ps-8 lg:ps-10  rounded-lg"
          />
          <SlCalender className="text-blue absolute bottom-9 left-2"></SlCalender>
        </div>
        <div className="pb-4 relative">
          <label htmlFor="time" className="ps-2">
            Time
          </label>{" "}
          <input
            type="text"
            name="time"
            id="time"
            placeholder="20:21 pm"
            className="input input-ghost w-full py-4 ps-8 lg:ps-10  rounded-lg"
          />
          <IoTimeSharp className="text-blue absolute bottom-9 left-2"></IoTimeSharp>
        </div>
        <div className="pb-4 relative">
          <label htmlFor="option" className="ps-2">
            Options
          </label>
          <select
            name="option"
            id=""
            className="select select-bordered w-full py-5 ps-8 lg:ps-10  rounded-lg"
          >
            <option defaultValue="Select option">Select option</option>
            <option value="Select option">Select option</option>
            <option value="Select option">Select option</option>
            <option value="Select option">Select option</option>
          </select>
          <RxHamburgerMenu className="text-blue absolute bottom-9 left-2"></RxHamburgerMenu>
        </div>
        <div className="pb-4 relative">
          <label htmlFor="product" className="ps-2">
            Products
          </label>{" "}
          <select
            name="product"
            id=""
            className="select select-bordered w-full py-5 ps-8 lg:ps-10  rounded-lg"
          >
            <option defaultValue=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>
          <RxHamburgerMenu className="text-blue absolute bottom-9 left-2"></RxHamburgerMenu>
        </div>
        <div>
          <label htmlFor="note" className="ps-2">
            Note
          </label>{" "}
          <textarea
            className="textarea textarea-bordered ps-8 lg:ps-10  rounded-lg w-full"
            name="note"
            id=""
            rows={6}
            placeholder="Enter note"
            maxLength={250}
          ></textarea>
        </div>
        <button className="btn bg-button text-white w-full py-4 rounded-xl mt-20 mb-12">
          Add lead
        </button>
      </form>
    </div>
  );
}

export default App;
