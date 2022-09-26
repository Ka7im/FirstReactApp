import { Component } from 'react';
import nextId from 'react-id-generator';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {

    constructor (props) {
        super(props);
        this.state = {
            data: [
                {name: 'John C.', salary: 800, increase: false, rise: true, id: nextId()},
                {name: 'Alex M.', salary: 3000, increase: true, rise: false, id: nextId()},
                {name: 'Carl W.', salary: 15000, increase: false, rise: false, id: nextId()}
            ],
            term: '',
            riseFilter: false,
            allEmployees: true,
            salaryMore: false
        }
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            /* const index = data.findIndex(elem => elem.id === id);
            
             const before = data.slice(0, index);
            const after = data.slice(index + 1);

            const newArr = [...before,...after]; */ 

            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        this.setState(({data}) => {
            return {
                data: data.concat([{
                    name: name,
                    salary: salary,
                    id: nextId(),
                    rise: false,
                    increase: false
                }])
            }
        })
    }

    onToggleProp= (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    searchRise = (data) => {
        return data.filter(item => {
            return item.rise;
        })
    }

    searchSalary = (data) => {
        return data.filter(item => item.salary > 1000);
    }
    
    onFilterRise = (rise) => {
        this.setState({riseFilter: rise});
    }

    onAllEmployees = (isAllEmployees) => {
        this.setState({allEmployees: isAllEmployees});
    }
    onSalaryMore = (more) => {
        this.setState({salaryMore: more})
    }

    render() {
        const {data, term} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        let searchedData = this.searchEmp(data, term);

        if (this.state.riseFilter) {
            searchedData = this.searchRise(searchedData);
        } else if (this.state.salaryMore) {
            searchedData = this.searchSalary(searchedData);
        }
        

        return (
            <div className="app">
                <AppInfo
                    employeesAmount={employees}
                    increaseAmount={increased} />
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter onFilterRise={this.onFilterRise}
                               onAllEmployees={this.onAllEmployees}
                               onSalaryMore={this.onSalaryMore} />
                </div>
    
                <EmployeesList 
                    data={searchedData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp} />
                <EmployeesAddForm onAdd={this.addItem} />
            </div>
        );
    }
}

export default App;