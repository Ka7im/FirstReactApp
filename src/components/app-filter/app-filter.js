import {Component} from 'react';

import './app-filter.css';

class AppFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            riseFilter: false,
            allEmployees: true,
            salaryMore: false
        }
    }

    classAction(e, number) {
        const btns = e.target.parentElement.children;
        for(let item of btns) {
            if (+item.getAttribute('data-btn') === number) {
                item.classList.remove('btn-outline-light');
                if (!item.classList.contains('btn-light')) {
                    item.classList.add('btn-light');
                }
            } else {
                item.classList.remove('btn-light');
                if (!item.classList.contains('btn-outline-light')) {
                    item.classList.add('btn-outline-light');
                }
            }
            
        }
    }

    onAllEmployees = (e, number) => {
        if (e.target.classList.contains('btn-light')){
            return;
        }
        if (this.state.riseFilter) {
            this.props.onFilterRise(!this.state.riseFilter)
            this.setState(({riseFilter})=>({riseFilter: !riseFilter}))
        }
        if (this.state.salaryMore) {
            this.props.onSalaryMore(!this.state.salaryMore);
            this.setState(({salaryMore})=>({salaryMore: !salaryMore}))
        }
        this.props.onAllEmployees(!this.state.allEmployees);
        this.setState(({allEmployees})=>({allEmployees: !allEmployees}))
        
       this.classAction(e, number);
    }

    onFilterRise = (e, number) => {
        if (e.target.classList.contains('btn-light')){
            return;
        }
        if (this.state.allEmployees) {
            this.props.onAllEmployees(!this.state.allEmployees)
            this.setState(({allEmployees})=>({allEmployees: !allEmployees}))
        }
        if (this.state.salaryMore) {
            this.props.onSalaryMore(!this.state.salaryMore);
            this.setState(({salaryMore})=>({salaryMore: !salaryMore}))
        }
        this.props.onFilterRise(!this.state.riseFilter);
        this.setState(({riseFilter})=>({riseFilter: !riseFilter}))
        
        this.classAction(e, number);

    }

    onSalaryMore = (e, number) => {
        if (e.target.classList.contains('btn-light')){
            return;
        }
        if (this.state.allEmployees) {
            this.props.onAllEmployees(!this.state.allEmployees)
            this.setState(({allEmployees})=>({allEmployees: !allEmployees}))
        }
        if (this.state.riseFilter) {
            this.props.onFilterRise(!this.state.riseFilter);
            this.setState(({riseFilter})=>({riseFilter: !riseFilter}))
        }
        this.props.onSalaryMore(!this.state.salaryMore);
        this.setState(({salaryMore})=>({salaryMore: !salaryMore}))
        
        this.classAction(e, number);
            
    }

    render() {
        return (
            <div className="btn-group">
                <button className="btn btn-light"
                        type="button"
                        data-btn={0}
                        onClick={(e) => this.onAllEmployees(e, 0)}>
                            Все сотрудники
                </button>
                <button className="btn btn-outline-light"
                        type="button"
                        onClick={(e) => this.onFilterRise(e, 1)}
                        data-btn={1}>
                            На повышение
                </button>
                <button className="btn btn-outline-light"
                        type="button"
                        data-btn={2}
                        onClick={(e) => this.onSalaryMore(e, 2)}>
                            З/П больше 1000$
                </button>
            </div>
        );
    }
}

export default AppFilter;