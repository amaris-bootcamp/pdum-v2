import React from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const HotelResults = () => {
  const { count, result } = useSelector((state) => state.results.hotels);

  return (
    <>
      {result && (
        <>
          <Table bordered hover className="search-results hotels">
            <thead>
              <tr>
                <th>Picture</th>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(result).map(
                (
                  {
                    accommodation_type,
                    accommodation_type_name,
                    address,
                    checkin,
                    checkout,
                    city,
                    composite_price_breakdown,
                    hotel_name,
                    latitude,
                    longitude,
                    main_photo_url,
                    max_1440_photo_url,
                    max_photo_url,
                    review_score,
                    zip,
                    url,
                    in_best_district,
                    is_beach_front,
                    is_city_center,
                    is_free_cancellable,
                  },
                  index
                ) => {
                  const { net_amount } = composite_price_breakdown;

                  return (
                    <tr key={index.toString()}>
                      <td>
                        <img
                          className="hotel-img"
                          src={max_1440_photo_url}
                          alt={hotel_name}
                        />
                      </td>
                      <td className="hotel">
                        <p>{hotel_name}</p>
                        {address}, {zip}, {city}
                        <br />
                        Check-in: {checkin.from} Check-out: {checkout.from}
                        <br />
                        ⭐️ {review_score}/10
                        <br />
                        <p className="hotel-bonuses">
                          {is_beach_front === 1 && (
                            <span title="beach front">🏖</span>
                          )}
                          {is_city_center === 1 && (
                            <span title="city center">🏙</span>
                          )}
                          {in_best_district === 1 && (
                            <span title="best district">👍</span>
                          )}
                          {is_free_cancellable === 1 && (
                            <span title="free cancellation">🆓</span>
                          )}
                        </p>
                      </td>
                      <td className="hotel-price">
                        <p>
                          {net_amount.currency}{" "}
                          {Math.round(net_amount.value * 100) / 100}
                        </p>
                        <Button
                          variant="outline-success"
                          size="lg"
                          as="a"
                          href={url}
                          target="_blank"
                        >
                          Check availability
                        </Button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default HotelResults;
