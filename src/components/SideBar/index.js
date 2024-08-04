import './index.css';

const SideBar = ({ eachList, handleActiveCategory, isActive }) => {
  const { categoryName } = eachList;

  const handleClick = () => {
    handleActiveCategory(categoryName);
  };

  return (
    <li>
      <p
        className={isActive ? 'isActive' : 'sidebar-category'}
        onClick={handleClick}
      >
        {categoryName}
      </p>
    </li>
  );
};

export default SideBar;
