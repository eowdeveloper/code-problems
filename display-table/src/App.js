import logo from './logo.svg';
import './App.css';

function App() {

  const data = [
    {
      region: "US",
      model: "A",
      sales: 150
    },
    {
      region: "US",
      model: "B",
      sales: 120
    },
    {
      region: "US",
      model: "C",
      sales: 350
    },
    {
      region: "EU",
      model: "A",
      sales: 200
    },
    {
      region: "EU",
      model: "B",
      sales: 100
    },
    {
      region: "EU",
      model: "C",
      sales: 250
    },
    {
      region: "CA",
      model: "A",
      sales: 200
    },
    {
      region: "CA",
      model: "B",
      sales: 100
    },
    {
      region: "CA",
      model: "C",
      sales: 230
    },
    {
      region: "CA",
      model: "D",
      sales: 400
    }
  ]
  
const sumRegion = function (dataArr) {
  var result = {};

  dataArr.forEach(function (element) {
    result[element.region] = (result[element.region]) 
      ? result[element.region] += +element.sales 
      : +element.sales;
  });

  return Object.keys(result).map(function (element) {
    return {region: element, model: "sum", sales: result[element]};  
  });
}

  var sumtest = sumRegion(data);

  var newArr = [];
  var lastIndexOfPreviousLoop = 0;

  for(const i in sumtest) {
      if(!(sumtest[i].region in newArr)){
          newArr.push(sumtest[i]);
          var sameCategory = data.filter((element) => element.region === sumtest[i].region).length;
          var increasingLength = lastIndexOfPreviousLoop + sameCategory;
          for( lastIndexOfPreviousLoop; lastIndexOfPreviousLoop < increasingLength; ++lastIndexOfPreviousLoop){
              newArr.push(data[lastIndexOfPreviousLoop]);
          }
      }
  }

  return (
    <div>
      <table>
        <thead className="table-header">
          <tr>
            <th>region</th>
            <th>model</th>
            <th>sales</th>
          </tr>
        </thead>
        <tbody>
          {newArr.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.region}</td>
                <td>{data.model}</td>
                <td>{data.sales}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
