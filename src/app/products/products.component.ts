import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder} from '@angular/forms'; // Import required classes
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../models/ProductDTO';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  @ViewChild('modalContent') modalContent: any;

  products: Product[] = [];
  isEditModal: boolean = false;
  modalTitle: string = '';
  editingProduct: Product = {
    id: 0,
    name: '',
    description: '',
    quantity: 0,
  };

  constructor(
    private productService: ProductService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService
      .getProducts()
      .subscribe(
        (products) => (this.products = products),
        (error) => {
          console.error('An error occurred while fetching products:', error);
          alert('An error occurred while fetching products.');
        }
      );
  }

  openCreateProductModal(): void {
    this.editingProduct = { id: 0, name: '', description: '', quantity: 0 };
    this.isEditModal = false;
    this.modalTitle = 'Create Product';
    this.openModal();
  }

  openEditProductModal(product: Product): void {
    this.editingProduct = { ...product };
    this.isEditModal = true;
    this.modalTitle = 'Edit Product';
    this.openModal();
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }

  onEditProductSubmit(): void {
    if (this.editingProduct) {
      this.productService
        .updateProduct(this.editingProduct)
        .subscribe(
          (updatedProduct) => {
            const index = this.products.findIndex(
              (p) => p.id === updatedProduct.id
            );
            if (index !== -1) {
              this.products[index] = updatedProduct;
            }
            this.closeModal();
            alert('Product updated successfully.');
          },
          (error) => {
            console.error('An error occurred during update:', error);
            alert('An error occurred while updating the product.');
          }
        );
    }
  }

  createProduct(): void {
    if (this.editingProduct) {
      this.productService
        .createProduct(this.editingProduct)
        .subscribe(
          (newProduct) => {
            this.products.push(newProduct);
            this.closeModal();
            alert('Product created successfully.');
          },
          (error) => {
            console.error('An error occurred during creation:', error);
            alert('An error occurred while creating the product.');
          }
        );
    }
  }

  onSubmit(): void {
      if (this.isEditModal) {
        this.onEditProductSubmit();
      } else {
        this.createProduct();
      }
  }

  deleteProduct(productId: any): void {
    if (this.editingProduct) {
      if (confirm('Are you sure you want to delete this product?')) {
        this.productService.deleteProduct(productId).subscribe(
          () => {
            this.products = this.products.filter(
              (p) => p.id !== this.editingProduct!.id
            );
            this.closeModal();
            this.getProducts();
            alert('Product deleted successfully.');
          },
          (error) => {
            console.error('An error occurred during deletion:', error);
            alert('An error occurred while deleting the product.');
          }
        );
      }
    }
  }

  openModal() {
    this.modalService.open(this.modalContent, {
      ariaLabelledBy: 'modal-title',
    });
  }
}
