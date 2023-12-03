function PopularDish() {
  return (
    <div className="col-7 col-md-4 col-lg-3 ">
      <div
        className="card border-0 popular-dishes-bg border-r-5"
        style={{ backgroundImage: "url(images/popular-dishes1.png)" }}
      >
        <div className="card-body backg-lin-grad border-r-5">
          <h5 className="card-title text-white text-center mt-5 pt-5">
            Italian Pizza
          </h5>
          <p className="card-text text-white text-center">12,456 &#11088;</p>
          <p className="text-white fs-16">
            Salami, onion and cheese
          </p>
          <div className="row py-2">
            <div className="col-6">
              <span className="h5 fw-bold text-white">50 ZŁ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularDish;
