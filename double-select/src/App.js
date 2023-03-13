import DoubleSelect from './components/DoubleSelect';

const items = [
  {
    name: "apple",
    category: "fruit"
  },
  {
    name: "Cucumber",
    category: "vegetable"
  },
  {
    name: "Banana",
    category: "fruit"
  },
  {
    name: "Celery",
    category: "vegetable"
  },
  {
    name: "orange",
    category: "fruit"
  },
  {
    name: "sausage",
    category: "meat"
  },
  {
    name: "bacon",
    category: "meat"
  }
];

function App() {
  return (
    <DoubleSelect items={items}/>
  );
}

export default App;
