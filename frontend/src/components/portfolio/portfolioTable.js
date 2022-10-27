import Check from "./portfoliotbc";
const PortfolioTable = (props) => {
  let count = 0;
  return (
    <>
      {props.table.map((data) => {
        count++;
        return <Check details={data} count={count} />;
      })}
    </>
  );
};

export default PortfolioTable;
