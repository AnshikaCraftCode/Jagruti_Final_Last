import { Link, useLocation } from "react-router-dom";

function Breadcrumb() {

  const location = useLocation();

  const path = location.pathname.split("/").filter(Boolean);

  return (

    <nav aria-label="breadcrumb">

      <ol className="breadcrumb">

        <li className="breadcrumb-item">

          <Link to="/">Home</Link>

        </li>

        {

          path.map((item,index)=>(

            <li
              key={index}
              className="breadcrumb-item active"
            >

              {item.charAt(0).toUpperCase()+item.slice(1)}

            </li>

          ))

        }

      </ol>

    </nav>

  )

}

export default Breadcrumb;