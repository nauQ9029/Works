import './App.css';

function App() {
  return (
    <div className="App">
      <table>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Image</th>
          <th>Address</th>
          <th>Featured</th>
        </tr>
        {
          STUDENTS.map((ele) => {
            return (
              <tr key={ele.id}>
                <td>{ele.id}</td>
                <td>{ele.name}</td>
                <td><img src={ele.image} alt="img"></img></td>
                <td>{ele.address}</td>
                <td>{ele.featured === true ? <input type='checkbox' checked></input> : <input type='checkbox'></input>}</td>
              </tr>
            )
          })
        }
      </table>
      <table>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Image</th>
          <th>Address</th>
          <th>Featured</th>
        </tr>
        {
          afterAdd.map((ele) => {
            return (
              <tr key={ele.id}>
                <td>{ele.id}</td>
                <td>{ele.name}</td>
                <td><img src={ele.image} alt="img"></img></td>
                <td>{ele.address}</td>
                <td>{ele.featured === true ? <input type='checkbox' checked></input> : <input type='checkbox'></input>}</td>
              </tr>
            )
          })
        }
      </table>
      <table>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Image</th>
          <th>Address</th>
          <th>Featured</th>
        </tr>
        {
          afterUpdate.map((ele) => {
            return (
              <tr key={ele.id}>
                <td>{ele.id}</td>
                <td>{ele.name}</td>
                <td><img src={ele.image} alt="img"></img></td>
                <td>{ele.address}</td>
                <td>{ele.featured === true ? <input type='checkbox' checked></input> : <input type='checkbox'></input>}</td>
              </tr>
            )
          })
        }
      </table>
      <table>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Image</th>
          <th>Address</th>
          <th>Featured</th>
        </tr>
        {
          afterDelete.map((ele) => {
            return (
              <tr key={ele.id}>
                <td>{ele.id}</td>
                <td>{ele.name}</td>
                <td><img src={ele.image} alt="img"></img></td>
                <td>{ele.address}</td>
                <td>{ele.featured === true ? <input type='checkbox' checked></input> : <input type='checkbox'></input>}</td>
              </tr>
            )
          })
        }
      </table>
    </div>
  );
}

export default App;

const STUDENTS = [
  {
    id: 'DE160182',
    name: 'Nguyễn Hữu Quốc Khánh',
    image: '/images/khanh.png',
    address: 'DaNang',
    featured: false,
  },
  {
    id: 'DE160377',
    name: 'Choy Vĩnh Thiện',
    image: '/images/thien.png',
    address: 'QuangNam',
    featured: false

  },
  {
    id: 'DE160547',
    name: 'Đỗ Nguyên Phúc',
    image: '/images/phuc.png',
    address: 'QuangNam',
    featured: false

  },
  {
    id: 'DE170049',
    name: 'Lê Hoàng Minh',
    image: '/images/minh.png',
    address: 'DaNang',
    featured: true,

  }
];


const afterAdd = addStudent(STUDENTS, {
  id: 'DE180583',
  name: 'Phạm Lê Minh Quân',
  image: '/images/minh.png',
  address: 'Thua Thien Hue',
  featured: true,
});

const afterDelete = deleteProduct(STUDENTS, 'DE160377');

const afterUpdate = updateProduct2(STUDENTS, 'DE170049', {
  id: 'DE160182',
  name: 'Lê Hoàng Minh updated',
  image: '/images/minh.png',
  address: 'Ho Chi Minh',
  featured: true,
});

// add
function addStudent(arr, newStudent) {
  let result = [...arr, newStudent];
  return result;
}

// detele
function deleteProduct(arr, idStudent) {
  let num = arr.findIndex((a) => a.id === idStudent);
  let result = [...arr];
  result.splice(num, 1);
  return result;
}

// update
function updateProduct(arr, idStudent, newElement) {
  let result = [...arr];
  let num = result.findIndex((a) => a.id === idStudent);
  result[num] = { ...result[num], ...newElement };
  return result;
}

function updateProduct2(arr, idStudent, newElement) {
  let result = [...arr];
  let num = result.findIndex((a) => a.id === idStudent);
  result[num] = { ...newElement };
  return result;
}