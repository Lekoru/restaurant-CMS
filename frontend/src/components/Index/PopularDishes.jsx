import PopularDish from "../../ui/PopularDish";

/* eslint-disable jsx-a11y/anchor-is-valid */
function PopularDishes() {
  return (
    <section className="">
      <div className="container px-3 px-md-2 my-3 py-3">
        <div className="row justify-content-center">
          <div className="col-12">
            <h3 className="fw-bold mb-4" style={{ fontSize: "24px" }}>
              Popular Dishes
            </h3>
            <div
              className="row flex-nowrap no-scroll-bar"
              style={{ overflowX: "scroll" }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                <PopularDish key={index} item={item} />
              ))}

              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PopularDishes;
