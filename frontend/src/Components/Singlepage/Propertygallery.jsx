import React from "react";
import single from "../../assets/Imges/Singlebig.jpg";
import roomone from "../../assets/Imges/Roomone.jpg";
import threeone from "../../assets/Imges/Rootwo.jpg";


import sngcss from '../../assets/Propertygallery.module.css'

const Propertygallery = () => {
  return (
    <div className="container py-4">
      <div className="mb-4">
        <span className="badge bg-dark mb-2">For-sale</span>
        <h2>Amazing modern apartment</h2>
        <p>43 W. Wellington Road Fairhope, AL 36532</p>
      </div>

      <div className="text-end mb-4">
        <h3>$120,000</h3>
        <p>$1200/sq.ft</p>
      </div>

      <div className="row g-4">
        <div className="col-md-8">
          <img
            src={single}
            className="img-fluid rounded mb-3"
            style={{ objectFit: "cover", height: "400px", width: "100%" }}
            alt="bigimage"
          />

          <div className="mb-4">
            <h4>Description</h4>
            <p>
             This apartment is thoughtfully crafted to provide a harmonious blend of comfort,
              elegance, and practical flow. Every space has been arranged with natural balance 
              in mind, ensuring that each area feels open, inviting, and intuitively connected.
               The layout promotes smooth movement between rooms, enhancing both functionality 
               and everyday living comfort.

                Clean lines, well-defined structure, and carefully planned spacing create an atmosphere
                  that feels both visually pleasing and highly practical. Each section of the home aligns
                 seamlessly with the next, allowing the design to breathe while improving readability
                and reducing visual clutter. The interiors are styled to maintain simplicity without
                sacrificing sophistication, resulting in a calm and pleasant ambience. <br />

                 Whether you're relaxing in the living area, preparing meals in the kitchen, or unwinding 
               in the bedrooms, this apartment provides a cohesive experience where design, comfort, and
               balance come together naturally. The thoughtful arrangement ensures a delightful visual 
                experience and a lifestyle that feels effortlessly smooth and well-organized.

              This placeholder text describes a layout and emphasizes natural
              spacing, structure, and balance. It talks about maintaining
              harmony in design, ensuring that elements stay aligned, and
              creating smooth interaction between sections. The text also refers
              to maintaining balance, improving readability, and ensuring a
              pleasant visual experience.
            </p>
          </div>

          {/* Property Details Table */}
          <div className="row">
            <div className="col-md-6">
              <h4>Property details</h4>
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <i className="bi bi-aspect-ratio me-2"></i>Total area
                    </td>
                    <td>100 sq.ft</td>
                  </tr>
                  <tr>
                    <td>
                      <i className="bi bi-bed me-2"></i>Bedrooms
                    </td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>
                      <i className="bi bi-droplet me-2"></i>Bathrooms
                    </td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>
                      <i className="bi bi-building me-2"></i>Floor
                    </td>
                    <td>3rd</td>
                  </tr>
                  <tr>
                    <td>
                      <i className="bi bi-calendar me-2"></i>Construction year
                    </td>
                    <td>2020</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-md-6 mt-4 mt-md-0 container">
              <h4>Additional features</h4>
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <i className="bi bi-lift me-2"></i>Elevator
                    </td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>
                      <i className="bi bi-car-front me-2"></i>Parking
                    </td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>
                      <i className="bi bi-wifi me-2"></i>Wi-Fi
                    </td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>
                      <i className="bi bi-tv me-2"></i>Cable TV
                    </td>
                    <td>Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-4 d-flex flex-column">
          <div className="mb-3">
            <img
              src={roomone}
              className="img-fluid rounded"
              style={{ objectFit: "cover", height: "190px", width: "100%" }}
              alt="smallimage"
            />
          </div>

          {/* Bottom Small Image */}
          <div>
            <img
              src={threeone}
              className="img-fluid rounded"
              style={{ objectFit: "cover", height: "190px", width: "100%" }}
              alt="smallimage2"
            />
          </div>
          
         
            <div className="mt-5 py-3 ">
                <div className={sngcss.formbox}>
          <div className="p-4  text-white rounded flex-grow-1 mb-3 ">
            <h4>Contact Agent</h4>
            <p>Emily Back</p>
            <form>
              <input className="form-control mb-3" placeholder="Your name" />
              <input className="form-control mb-3" placeholder="Your email" />
              <input className="form-control mb-3" placeholder="Your phone" />
              <textarea
                className="form-control mb-3"
                placeholder="Your message"
                rows="4"
              ></textarea>
              <button className="btn btn-light w-50" type="submit">
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Propertygallery;
