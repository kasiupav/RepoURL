# B2B Asian Food Ingredient Wholesale Platform

## Project Description

The **B2B Asian Food Ingredient Wholesale Platform** is a web-based e-commerce system designed for restaurants and food businesses to purchase ingredients and restaurant supplies from a wholesaler.

The platform provides a dedicated environment for business clients to place wholesale orders online and for company staff to manage products, warehouses, orders, and sales analytics.

The system aims to automate order processing, improve stock visibility, and provide better sales insights for wholesalers operating in the B2B food distribution sector.

## Motivation

Many small and medium food wholesalers still process orders manually using emails, phone calls, or spreadsheets. This leads to several operational problems:

- slow order processing
- human errors in orders
- poor visibility of warehouse stock
- lack of sales analytics
- inefficient communication with business clients

This platform solves these problems by providing a centralized web system that automates ordering, inventory management, and sales monitoring.

## Technology Stack

The project is built using the following technologies:

- **Java**
- **Spring Boot**
- **Spring MVC (REST API)**
- **Hibernate / JPA**
- **MySQL**
- **Maven**
- **HTML / CSS / JavaScript (Frontend UI)**

## System Architecture

The system follows a layered architecture:

Main backend components:

- Controllers – handle HTTP requests
- Services – implement business logic
- Repositories – database communication using JPA
- Entities – domain data models

## System Modules

The platform consists of two main modules.

### 1. B2B E-Shop Interface

Used by restaurants and business clients to place wholesale orders.

Main functionalities:

- product catalog browsing
- product search and filtering
- product detail pages
- shopping cart
- order placement
- order history
- invoice downloads

### 2. Administration Panel

Used by company employees to manage the platform.

Main functionalities:

- product catalog management
- warehouse inventory management
- order processing
- customer management
- pricing management
- analytics dashboard

## User Roles

The platform supports several roles.

### Business Customer (B2B Client)

Restaurants and food businesses using the platform to purchase ingredients.

Responsibilities:

- browsing products
- placing orders
- managing cart
- viewing order history
- downloading invoices

### Sales Manager

Responsible for managing customer orders.

Responsibilities:

- monitoring incoming orders
- approving or modifying orders
- communicating with clients
- viewing sales reports

### Warehouse Manager

Responsible for inventory and stock management.

Responsibilities:

- managing warehouse stock
- updating product quantities
- monitoring low-stock alerts
- confirming shipments

### System Administrator

Has full access to the platform.

Responsibilities:

- managing users and permissions
- managing products and categories
- managing warehouses
- monitoring system activity
- accessing analytics dashboards

## Key Features

### Product Management

- create products
- edit product information
- delete products
- manage categories
- upload product images
- set wholesale pricing

### Warehouse Management

- manage multiple warehouses
- update stock levels
- transfer products between warehouses
- view stock reports
- receive low-stock alerts

### Order Processing

- view incoming orders
- approve orders
- modify order quantities
- update order status
- generate invoices
- manage shipping information

### Sales Analytics

The system provides visual analytics dashboards including:

- daily sales trends
- monthly revenue reports
- best-selling products
- sales by category
- customer activity statistics

### Inventory Analytics

- stock levels
- product turnover
- warehouse distribution
- low-stock monitoring

## Access Control

| Functionality | Customer | Sales Manager | Warehouse Manager | Administrator |
|---------------|----------|---------------|------------------|---------------|
| Browse products | ✓ | ✓ | ✓ | ✓ |
| Place orders | ✓ | ✗ | ✗ | ✗ |
| Order management | ✗ | ✓ | ✗ | ✓ |
| Product management | ✗ | ✗ | ✗ | ✓ |
| Warehouse management | ✗ | ✗ | ✓ | ✓ |
| Sales analytics | ✗ | ✓ | ✗ | ✓ |
| User management | ✗ | ✗ | ✗ | ✓ |

## Installation

### 1 Clone the repository

git clone https://github.com/kasiupav/RepoURL.git

### 2 Go to the project folder

cd RepoURL

### 3 Configure the database in

src/main/resources/application.properties

Example configuration

spring.datasource.url=jdbc:mysql://localhost:3306/b2b_food_db  
spring.datasource.username=root  
spring.datasource.password=yourpassword  
spring.jpa.hibernate.ddl-auto=update

### 4 Run the application

mvn spring-boot:run

## Authors

- Ulyana Liaschenia  
- Katsiaryna Paverannaya
