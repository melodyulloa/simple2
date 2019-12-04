
import React,{Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from "../utils/setAuthToken";
import AllProducts from './AllProducts';
const Swal = require('sweetalert2');

class Inventory extends Component{
    constructor (props){
        super(props);
        this.state={
          product:'',
          category: '',
          quantity:'',
          cost:'',
          totalCost:'',
          salesPrice:'',
          products:[],
          rows: [],
          editProduct: '',
            editCategory: '',
            editQuantity: '',
            editCost: '',
            editTotalCost: '',
            editSalesPrice: '',
            editProductId: ''
        };
 
       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit=this.handleSubmit.bind(this);
       this.displayProducts = this.displayProducts.bind(this);
       this.deleteProduct = this.deleteProduct.bind(this);
       this.handleEditSubmit=this.handleEditSubmit.bind(this);
   }

   componentWillMount(){
       this.checkAuth()
   }


   checkAuth(){

        let token = localStorage.jwtToken;
        
        if(token){
            axios({
                method: 'get',
                url: '/api/products',
                headers: {
                    Authorization: token
                }
            })
            .then(response=>{
                this.setState({
                    products: response.data.ourProductArr
                },()=>{
                    this.displayProducts()
                });
    
            })
            .catch(error =>{
                console.log(error);
                localStorage.clear();
                this.props.history.push("/login") 
            })
        }else{
            this.props.history.push("/login") 
        }
    
    }


   handleChange(name, event){
       
        this.setState({
            [name]: event.target.value
        }, () => {
            if(this.state.quantity!=='' && this.state.cost!==''){
                let tc = (this.state.quantity * this.state.cost).toFixed(2);;
                
                this.setState({
                    totalCost: tc
                });
            }else{
                this.setState({
                    totalCost: ''
                });
            }
        });
    }

    handleChangeEdit(name, event){
       
        this.setState({
            [name]: event.target.value
        }, () => {
            if(this.state.editQuantity!=='' && this.state.editCost!==''){
                let tc = (this.state.editQuantity * this.state.editCost).toFixed(2);;
                
                this.setState({
                    editTotalCost: tc
                });
            }else{
                this.setState({
                    editTotalCost: ''
                });
            }
        });
    }

    // Create new product
    handleSubmit(event){
        var body = this.state;

        let url = 'api/products';
        let token = localStorage.jwtToken;

        axios({
          method: 'post',
          url: '/api/products',
          data: body,
          headers: {
            Authorization: token
          }
        })
        .then(response=>{
            this.state.products.push(response.data.productData);
            this.setState({
                products: this.state.products
            },()=>{
                this.resetForm();
                this.displayProducts()
            });
        })
        .catch(error =>{
            console.log(error);
        })
        // alert('Form has been submitted');
        event.preventDefault();
    }


    handleEditSubmit(event){

        var body = {
            product: this.state.editProduct,
            category: this.state.editCategory,
            quantity: this.state.editQuantity,
            cost: this.state.editCost,
            totalCost: this.state.editTotalCost,
            salesPrice: this.state.editSalesPrice
        }

        let token = localStorage.jwtToken;
        
        axios({
          method: 'put',
          url: '/api/products/'+this.state.editProductId,
          data: body,
          headers: {
            Authorization: token
          }
        })
        .then(response=>{
            this.setState({
                products: response.data.ourProductArr
            },()=>{
                document.getElementById("modalBtn").click();

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    onOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Changes saved successfully.'
                  })


                this.displayProducts()
            });
        })
        .catch(error =>{
            console.log(error);
        })
        // alert('Form has been submitted');
        event.preventDefault();
    }

      resetForm(){
        this.setState({
            product:'',
            category: '',
            quantity:'',
            cost:'',
            totalCost:'',
            salesPrice:''
        });
      }

      editProduct(x){
        window.product = x;
        this.setState({
            editProduct:x.product,
            editQuantity:x.quantity,
            editCategory: x.category,
            editCost:x.cost,
            editTotalCost:x.totalCost,
            editSalesPrice:x.salesPrice,
            editProductId: x.id
        });
      }

      displayProducts(){
        let rowsArr = [];

        for(let i = 0;i<this.state.products.length;i++){
            let row =   <tr key={i}>
                            <td>{i+1}</td>
                            <td>{this.state.products[i].product}</td>
                            <td>{this.state.products[i].category}</td>
                            <td>{this.state.products[i].quantity}</td>
                            <td>{this.state.products[i].cost}</td>
                            <td>{this.state.products[i].totalCost}</td>
                            <td>{this.state.products[i].salesPrice}</td>
                            <td>
                                <a href="#" style = {{color: 'grey'}} title = "edit" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => this.editProduct(this.state.products[i])}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></a>
                                <a href="#" style ={{color: 'grey'}} title = "delete" onClick={() => this.deleteProduct(this.state.products[i].id)}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg></a>
                            </td>
                            
                        </tr>
            rowsArr.push(row);
        }

        this.setState({
            rows: rowsArr
        });
      }

      deleteProduct(id){
    
        let data = {
            productId: id
        };

        let token = localStorage.jwtToken;

        axios({
            method: 'delete',
            url: '/api/products/'+id,
            body: data,
            headers: {
                Authorization: token
            }
        })
        .then(response=>{
            console.log("product deleted");
            this.setState({
                products: response.data.ourProductArr
            },()=>{
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    onOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Deleted successfully'
                  })
                this.displayProducts()
            });
        })
        .catch(error =>{
            console.log(error);
        })
      }

    render(){
        

        return (
            <div id="wrapper">
                   

                     
                     {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                    Launch demo modal
                    </button> */}

                   
                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalCenterTitle">Edit Product</h5>
                                    <button type="button" id="modalBtn" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form id="editForm">
                                            <div class="form-group row">
                                                <label for="inputEmail3" class="col-sm-2 col-form-label">Product</label>
                                                <div class="col-sm-10">
                                                <input type="text" class="form-control" id="product" value={this.state.editProduct} onChange={(e) => this.handleChangeEdit("editProduct",e)} />
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label for="inputEmail3" class="col-sm-2 col-form-label">Category</label>
                                                <div class="col-sm-10">
                                                    <select class="form-control" id="category" placeholder="select one" label="select one" onChange={(e) => this.handleChangeEdit("editCategory",e)}><optgroup label="select one"><option value="" selected="" label="select one">This is item 1</option><option value="accessory" label="Accessory">This is item x</option><option value="electronics" label="Electronics">This is item 2</option><option value="makeup" label="Makeup">This is item 3</option></optgroup></select>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label for="inputPassword3" class="col-sm-2 col-form-label">Quantity</label>
                                                <div class="col-sm-10">
                                                <input type="text" class="form-control" id="quantity" value={this.state.editQuantity} onChange={(e) => this.handleChangeEdit("editQuantity",e)} />
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label for="inputPassword3" class="col-sm-2 col-form-label">Cost</label>
                                                <div class="col-sm-10">
                                                <input type="text" class="form-control" id="cost" value={this.state.editCost} onChange={(e) => this.handleChangeEdit("editCost",e)} />
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label for="inputPassword3" class="col-sm-2 col-form-label">Total Cost</label>
                                                <div class="col-sm-10">
                                                <input type="text" class="form-control" id="totalCost" value={this.state.editTotalCost} onChange={(e) => this.handleChangeEdit("editTotalCost",e)}/>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label for="inputPassword3" class="col-sm-2 col-form-label">Sales Price</label>
                                                <div class="col-sm-10">
                                                <input type="text" class="form-control" id="salesPrice" value={this.state.editSalesPrice} onChange={(e) => this.handleChangeEdit("editSalesPrice",e)}/>
                                                </div>
                                            </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onClick={this.handleEditSubmit}>Save changes</button>
                                </div>
                                </div>
                            </div>
                    </div>


                    <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0" style={{position:'fixed',marginTop:56+'px'}}>
                                <div class="container-fluid d-flex flex-column p-0">
                                    <a class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
                                        <div class="sidebar-brand-icon rotate-n-15"><i class="fas fa-laugh-wink"></i></div>
                                        <div class="sidebar-brand-text mx-3"><span>simplePOS</span></div>
                                    </a>
                                    <hr class="sidebar-divider my-0"/>
                                    <ul class="nav navbar-nav text-light" id="accordionSidebar">
                                        <li class="nav-item" role="presentation"></li>
                                        <li class="nav-item" role="presentation"><a class="nav-link" href="pos.html"><i class="fas fa-window-maximize"></i><span>Main Screen</span></a></li>
                                        <li class="nav-item" role="presentation"><Link className="nav-link active" to="/inventory"><i class="fas fa-window-maximize"></i>Inventory</Link></li>
                                        <li class="nav-item" role="presentation"><a class="nav-link" href="dashboard.html"><i class="fas fa-window-maximize"></i><span>Sales Performance</span></a></li>
                                        <li class="nav-item" role="presentation"><Link className="nav-link" to="/profile"><i class="fas fa-window-maximize"></i>Profile</Link></li>
                                    </ul>
                                    <div class="text-center d-none d-md-inline"><button class="btn rounded-circle border-0" id="sidebarToggle" type="button"></button></div>
                                </div>
                    </nav>

                    <div class="d-flex flex-column" id="content-wrapper" style={{marginLeft:226+'px',marginTop:56+'px'}}>
                        <div id="content" style={{paddingTop: 1+'em'}}>
                            
                            <div class="container-fluid">
                                <h3 class="text-dark mb-1">Inventory</h3>
                            </div>
                            <div class="table-responsive text-center align-content-center">
                                <table class="table">
                                    <thead class="text-center justify-content-center">
                                        <tr>
                                            <th style={{width: 130.859+ "px"}}>Product</th>
                                            <th class="category" style={{width: 130.859+'px'}}>Category</th>
                                            <th style={{width: 130.859+'px'}}>Quantity</th>
                                            <th style={{width: 130.859+'px'}}>Cost</th>
                                            <th style={{width: 130.859+'px'}}>Total Cost</th>
                                            <th style={{width: 130.859+'px'}}>Sales Price</th>
                                            <th style={{width: 130.859+'px'}}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr></tr>
                                    </tbody>
                                </table>
                            </div>
                            <form style={{padding:1+'em'}}>
                                <div class="form-group">
                                    <div class="form-row text-center">
                                        <div class="col"><input class="form-control" type="text" id="new-item" placeholder="enter item" value={this.state.product} onChange={(e) => this.handleChange("product",e)}/></div>
                                        <div class="col"><select class="form-control" id="category" placeholder="select one" label="select one" onChange={(e) => this.handleChange("category",e)}><optgroup label="select one"><option value="" selected="" label="select one">This is item 1</option><option value="accessory" label="Accessory">This is item x</option><option value="electronics" label="Electronics">This is item 2</option><option value="makeup" label="Makeup">This is item 3</option></optgroup></select></div>
                                        <div class="col" style={{width: 175+'px'}}>
                                            <div class="form-row">
                                                <div class="col" style={{width: 54+'px'}}><input class="form-control d-inline-flex" type="text" id="units" placeholder="units" value={this.state.quantity} onChange={(e) => this.handleChange("quantity",e)}/></div>
                                            </div>
                                    </div>
                                    <div class="col" style={{width: 213+'px'}}><input class="form-control" type="text" id="cost" placeholder="$0.00" value={this.state.cost} onChange={(e) => this.handleChange("cost",e)}/></div>
                                    <div class="col"><input readOnly class="form-control" type="text" id="total_cost" placeholder="$0.00" value={this.state.totalCost}/></div>
                                    <div class="col"><input class="form-control" type="text" id="sales_price" placeholder="$0.00" value={this.state.salesPrice} onChange={(e) => this.handleChange("salesPrice",e)}/></div>
                                    <div class="col"><button class="btn btn-primary border rounded" id="add-item" onClick={this.handleSubmit} >Add Item</button></div>
                                </div>
                                </div>
                            </form>
                            <div class="btn-group" role="group"></div>

                            <table class="table table-hover">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product</th>
                                <th scope="col">Category</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Cost</th>
                                <th scope="col">Total Cost</th>
                                <th scope="col">Sales Price</th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                                <tbody>
                                    {this.state.rows}
                                </tbody>
                            </table>
                </div>

                <footer class="bg-white sticky-footer">
                    <div class="container my-auto">
                        <div class="text-center my-auto copyright"><span>Copyright © Brand 2019</span></div>
                    </div>
                </footer>

                </div>
            
            </div>
        )
    }
}

export default withRouter(Inventory);