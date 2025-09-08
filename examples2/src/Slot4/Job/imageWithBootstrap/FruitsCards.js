import { fruits } from "./fruits";

const FruitsCards = () => {
  return (
    <>
      <div class="container">
        <div class="row align-items-start">
          {fruits.map((fruit) => (
            <div class="col">
              <div class="card">
                <img
                  src={fruit.img}
                  className="card-img-top"
                  alt={fruit.id}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div class="card-body text-center">
                  <h5 class="card-title">{fruit.name}</h5>
                  <p class="card-text center">Color: {fruit.color}</p>
                  <a href="#" class="btn btn-primary center">
                    Buy
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default FruitsCards;
