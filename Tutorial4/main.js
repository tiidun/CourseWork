// Define a Vue component for the product
Vue.component('product', {
props: {
    // Prop to determine if the user has a premium subscription
    premium: {
        type: Boolean,
        required: true
    }
},
template: `
    <div class="product">
        
        <div class="product-image">
            <!-- Display the image of the currently selected variant -->
            <img :src="image" />
        </div>

        <div class="product-info">
            <!-- Display the product name -->
            <h1>{{ product }}</h1>
            <!-- Display stock status -->
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <!-- Display shipping cost -->
            <p>Shipping: {{ shipping }}</p>

            <!-- List product details -->
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <!-- Display color variants with hover functionality -->
            <div class="color-box"
                v-for="(variant, index) in variants" 
                :key="variant.variantId"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)"
                >
            </div> 

            <!-- Add to cart button, disabled if out of stock -->
            <button v-on:click="addToCart" 
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }"
                >
            Add to cart
            </button>

        </div> 

        <!-- Display reviews if available -->
        <div>
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul v-else>
                <li v-for="(review, index) in reviews" :key="index">
                    <p>{{ review.name }}</p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                    <p>Recommendation: {{ review.recommend }}</p>
                </li>
            </ul>
        </div>
        
        <!-- Include the product review form -->
        <product-review @review-submitted="addReview"></product-review>
    
    </div>
`,
data() {
    return {
        // Product properties
        product: 'Socks',
        brand: 'Vue Mastery',
        selectedVariant: 0,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
                variantQuantity: 10     
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
                variantQuantity: 0     
            }
        ],
        reviews: [] // Array to hold reviews
    }
},
methods: {
    // Emit event to add a product to the cart
    addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    // Update the displayed variant based on user selection
    updateProduct(index) {  
        this.selectedVariant = index
    },
    // Add a submitted review to the reviews array
    addReview(productReview) {
        this.reviews.push(productReview)
    }
},
computed: {
    // Compute the product title
    title() {
        return this.brand + ' ' + this.product  
    },
    // Compute the image of the selected variant
    image() {
        return this.variants[this.selectedVariant].variantImage
    },
    // Check if the selected variant is in stock
    inStock() {
        return this.variants[this.selectedVariant].variantQuantity
    },
    // Determine shipping cost based on premium status
    shipping() {
        if (this.premium) {
            return "Free"
        }
        return 2.99
    }
}
})

// Define a Vue component for the product review form
Vue.component('product-review', {
template: `
    <form class="review-form" @submit.prevent="onSubmit">
    
        <!-- Display errors if any -->
        <p class="error" v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>

        <!-- Name input -->
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name">
        </p>
        
        <!-- Review textarea -->
        <p>
            <label for="review">Review:</label>      
            <textarea id="review" v-model="review"></textarea>
        </p>
        
        <!-- Rating dropdown -->
        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>

        <!-- Recommendation radio buttons -->
        <p>Would you recommend this product?</p>
        <label>
            Yes
            <input type="radio" value="Yes" v-model="recommend"/>
        </label>
        <label>
            No
            <input type="radio" value="No" v-model="recommend"/>
        </label>
            
        <!-- Submit button -->
        <p>
            <input type="submit" value="Submit">  
        </p>    
        
    </form>
`,
data() {
    return {
        // Form inputs
        name: null,
        review: null,
        rating: null,
        recommend: null,
        errors: [] // Array to hold validation errors
    }
},
methods: {
    // Handle form submission with validation
    onSubmit() {
        this.errors = []
        if(this.name && this.review && this.rating && this.recommend) {
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating,
                recommend: this.recommend
            }
            this.$emit('review-submitted', productReview) // Emit the review data
            // Reset form inputs
            this.name = null
            this.review = null
            this.rating = null
            this.recommend = null
        } else {
            // Add error messages for missing fields
            if(!this.name) this.errors.push("Name required.")
            if(!this.review) this.errors.push("Review required.")
            if(!this.rating) this.errors.push("Rating required.")
            if(!this.recommend) this.errors.push("Recommendation required.")
        }
    }
}
})

// Main Vue instance
var app = new Vue({
el: '#app',
data: {
    premium: true, // User premium status
    cart: [] // Array to store cart items
},
methods: {
    // Update the cart with a new product ID
    updateCart(id) {
        this.cart.push(id)
    }
}
})
