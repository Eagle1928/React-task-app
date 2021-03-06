import React, {Component} from 'react';
import { connect } from 'react-redux';
import classes from './newOrder.module.css';
import AddItems from '../../components/addItems/addItems'
import Chart from '../../components/chart/chart';
import * as actions from '../../store/actions/index'

class newOrder extends Component {

    state = {
      chart_display: false,
      check_items: [],
      search_input: '',
      total_price:0,
      items: [
        {name: 'Apple', price:5},
        {name: 'Grapes', price:10},       
         {name: 'Grapes', price:10},
        {name: 'Grapes', price:10},
        {name: 'Grapes', price:10},
        {name: 'Grapes', price:10},
        {name: 'Grapes', price:10},
        {name: 'Tomatoes', price:12},
        {name: 'Lemon', price:5},
         {name: 'Grapes', price:10},
        {name: 'Grapes', price:10},
        {name: 'Grapes', price:10},
        {name: 'Pear', price:5},
        {name: 'Apple', price:5},
        {name: 'Apple', price:5},
        {name: 'Apple', price:5},
        {name: 'Apple', price:5},

    ]
    }
    onAddChartClick = () => {
      this.setState({
        ...this.state,
        chart_display: true})
      console.log(this.state.chart_display);
    }
    onChangeSearchInput = (event) => {
      this.setState({
        search_input: event.target.value
      })
    }
    
    onPlaceOrder = (items,totalPrice) => {
      if(this.state.check_items.length === 0) {
          alert("choose items before ordering");
          return;
        }
      this.props.onOrderAdd(items,totalPrice)
      this.props.history.push("/Orders");
    }

    addItemToCheckedItems = (event) => {
      let checked = true;
     let  updatedCheckedItems = this.state.check_items
     const newItem = {name:event.target.value,
                      price:event.target.dataset.tag,
                      id: event.target.dataset.index}
    if(event.target.checked) {
     updatedCheckedItems.push(newItem)
    } else {
      checked = false
      updatedCheckedItems = updatedCheckedItems.filter((el) => { 
        return el.id !== newItem.id;
      });

    }

    let total;
    if(checked)
      total = parseInt(this.state.total_price) + parseInt(newItem.price)
    else total = parseInt(this.state.total_price) - parseInt(newItem.price)


      this.setState({
        check_items: updatedCheckedItems,
         total_price: total
      })
    };
    addItemToCheckedItems = this.addItemToCheckedItems.bind(this);
    render(){
        return(    <div className={classes.container}>
    <div className={classes.title}>  New Order </div>

            <div className={classes.flex}>
            <AddItems onAddChartClick={() =>this.onAddChartClick()} searchValue={this.state.search_input} onChangeSearchInput={(event) => this.onChangeSearchInput(event)} checkedItems={this.state.check_items} addCheckItem={(event) => this.addItemToCheckedItems(event)} items={this.state.items}/>
            <div className={classes.vr}></div>
            <Chart display={this.state.chart_display} onOrderAdd={this.onPlaceOrder} totalPrice={this.state.total_price} checkedItems={this.state.check_items} />

        </div>
    </div>
        )
    }
        

}

const mapStateToProps = state => {
  return {
      orders: state.orders
  };
}
const mapDispatchToProps = dispatch => {
  return {
      onOrderAdd :  (items,totalPrice) => dispatch(actions.addOrder(items,totalPrice)),
      }
}



export default connect(mapStateToProps, mapDispatchToProps)(newOrder);
