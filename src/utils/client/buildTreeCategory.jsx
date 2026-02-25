import "./buildTreeCategory.scss"
import {RightOutlined} from "@ant-design/icons"
import {Link} from "react-router-dom";
function CategoryItem({ item }) {
  return (
    <li className="menu-item">
      <Link className="item-parent" to={`/products/${item.slug}`}>
        <span className="menu-title">{item.title}</span>
        {item?.children.length > 0 && <RightOutlined />}
      </Link>

      {item.children?.length > 0 && (
        <ul className="submenu">
          {item.children.map(child => (
            <CategoryItem key={child._id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function CategoryMenu({ data }) {
  return (
    <ul className="menu">
      {data.map(item => (
        <CategoryItem key={item._id} item={item} />
      ))}
    </ul>
  );
}
