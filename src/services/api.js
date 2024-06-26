import axios from "axios";
import emailjs from "emailjs-com";
import store from "@/store";
import router from "@/router";
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;
    const xServiceUrl = process.env.VUE_APP_XSERVICE_URL; // For Production
    // const xServiceUrl = "/xapi"; // For Development
    if (
      error.response.status === 403 &&
      error.response.data === "Access token expired" &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          `${xServiceUrl}/users/refresh-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${store.getters.userInfo.token.refresh_token}`,
            },
          }
        );
        originalRequest.headers.Authorization = `Bearer ${response.data.token.access_token}`;
        store.dispatch("setUser", response.data);
        return axios(originalRequest);
      } catch (err) {
        // Handle Refresh token error
        router.push("/login");
      }
    }
    return Promise.reject(error);
  }
);
class BaseApiServices {
  xServiceUrl = process.env.VUE_APP_XSERVICE_URL; // For Production
  // xServiceUrl = "/xapi"; // For Development
  constructor(resource) {
    if (!resource) throw new Error("Resource is not provided");
    this.resource = resource;
  }

  setHeaders() {
    return {
      Authorization: `Bearer ${store.getters.userInfo.token.access_token}`,
    };
  }
  async handleErrors(error) {
    console.error(error);
  }
}
class EmailsApiService extends BaseApiServices {
  constructor() {
    super("emailing");
  }
  async sendEmail(payload) {
    try {
      const serviceId = payload.serviceId;
      const templateId = payload.templateId;
      const templateParams = payload.templateParams; // such as { name: "", subject: "" }
      const userId = payload.userId;

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        userId
      );

      return response;
    } catch (error) {
      console.error("Email failed to send: ", error);
      return;
    }
  }
}

class UsersApiServices extends BaseApiServices {
  constructor() {
    super("users");
  }

  async fetch() {
    try {
      const response = await axios.get(`${this.xServiceUrl}/${this.resource}`, {
        headers: this.setHeaders(),
      });

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async getById(id) {
    try {
      const response = await axios.get(
        `${this.xServiceUrl}/${this.resource}/${id}`,
        {
          headers: this.setHeaders(),
        }
      );

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async getByParams(params) {
    try {
      const response = await axios.get(`${this.xServiceUrl}/${this.resource}`, {
        params: params,
        headers: this.setHeaders(),
      });

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async create(payload) {
    try {
      const response = await axios.post(
        `${this.xServiceUrl}/${this.resource}`,
        payload
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async registration(payload) {
    try {
      const response = await axios.post(
        `${this.xServiceUrl}/${this.resource}/registration`,
        payload
      );
      return response;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async login(payload) {
    try {
      const response = await axios.post(
        `${this.xServiceUrl}/${this.resource}/login`,
        payload
      );
      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async checkExistingAccount(params) {
    try {
      const response = await axios.get(
        `${this.xServiceUrl}/${this.resource}/check-existing-account`,
        {
          params: params,
        }
      );
      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }
}

class ProductsApiServices extends BaseApiServices {
  constructor() {
    super("products");
  }

  async fetch() {
    try {
      const response = await axios.get(`${this.xServiceUrl}/${this.resource}`);

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async getById(id) {
    try {
      const response = await axios.get(
        `${this.xServiceUrl}/${this.resource}/${id}`
      );

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async getByParams(params) {
    try {
      const response = await axios.get(`${this.xServiceUrl}/${this.resource}`, {
        params: params,
      });
      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async create(payload) {
    try {
      const response = await axios.post(
        `${this.xServiceUrl}/${this.resource}`,
        payload,
        {
          headers: this.setHeaders(),
        }
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async update(payload) {
    try {
      const response = await axios.patch(
        `${this.xServiceUrl}/${this.resource}/${payload.id}`,
        payload,
        {
          headers: this.setHeaders(),
        }
      );
      return response;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async delete(id) {
    try {
      const response = await axios.delete(
        `${this.xServiceUrl}/${this.resource}/${id}`,
        {
          headers: this.setHeaders(),
        }
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }
}

class ShippingAddressesApiServices extends BaseApiServices {
  constructor() {
    super("shipping-addresses");
  }

  async fetch() {
    try {
      const response = await axios.get(`${this.xServiceUrl}/${this.resource}`, {
        headers: this.setHeaders(),
      });

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async getById(id) {
    try {
      const response = await axios.get(
        `${this.xServiceUrl}/${this.resource}/${id}`,
        {
          headers: this.setHeaders(),
        }
      );

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async getByParams(params) {
    try {
      const response = await axios.get(`${this.xServiceUrl}/${this.resource}`, {
        params: params,
        headers: this.setHeaders(),
      });

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async create(payload) {
    try {
      const response = await axios.post(
        `${this.xServiceUrl}/${this.resource}`,
        payload,
        {
          headers: this.setHeaders(),
        }
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async update(payload) {
    try {
      const response = await axios.patch(
        `${this.xServiceUrl}/${this.resource}/${payload.id}`,
        payload,
        {
          headers: this.setHeaders(),
        }
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }
  async delete(id) {
    try {
      const response = await axios.delete(
        `${this.xServiceUrl}/${this.resource}/${id}`,
        {
          headers: this.setHeaders(),
        }
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }
}

class WarrantyCardsApiServices extends BaseApiServices {
  constructor() {
    super("warranty-cards");
  }

  async fetch() {
    try {
      const response = await axios.get(`${this.xServiceUrl}/${this.resource}`, {
        headers: this.setHeaders(),
      });

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async getById(id) {
    try {
      const response = await axios.get(
        `${this.xServiceUrl}/${this.resource}/${id}`,
        {
          headers: this.setHeaders(),
        }
      );

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async getByParams(params) {
    try {
      const response = await axios.get(`${this.xServiceUrl}/${this.resource}`, {
        params: params,
        headers: this.setHeaders(),
      });

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async create(payload) {
    try {
      const response = await axios.post(
        `${this.xServiceUrl}/${this.resource}`,
        payload,
        {
          headers: this.setHeaders(),
        }
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async update(payload) {
    try {
      const response = await axios.patch(
        `${this.xServiceUrl}/${this.resource}/${payload.id}`,
        payload,
        {
          headers: this.setHeaders(),
        }
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }
  async delete(id) {
    try {
      const response = await axios.delete(
        `${this.xServiceUrl}/${this.resource}/${id}`,
        {
          headers: this.setHeaders(),
        }
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }
}

class OrdersApiServices extends BaseApiServices {
  constructor() {
    super("orders");
  }

  async fetch() {
    try {
      const response = await axios.get(`${this.xServiceUrl}/${this.resource}`, {
        headers: this.setHeaders(),
      });

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async getByParams(params) {
    try {
      const response = await axios.get(`${this.xServiceUrl}/${this.resource}`, {
        params: params,
        headers: this.setHeaders(),
      });

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async create(payload) {
    try {
      const response = await axios.post(
        `${this.xServiceUrl}/${this.resource}`,
        payload,
        {
          headers: this.setHeaders(),
        }
      );
      if (response) {
        return response;
      }
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async update(payload) {
    try {
      const response = await axios.patch(
        `${this.xServiceUrl}/${this.resource}/${payload.id}`,
        payload,
        {
          headers: this.setHeaders(),
        }
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }
  async delete(id) {
    try {
      const response = await axios.delete(
        `${this.xServiceUrl}/${this.resource}/${id}`,
        {
          headers: this.setHeaders(),
        }
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }
}

class OrderProductsApiServices extends BaseApiServices {
  constructor() {
    super("order-products");
  }

  async fetch() {
    try {
      const response = await axios.get(`${this.xServiceUrl}/${this.resource}`, {
        headers: this.setHeaders(),
      });

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async getByParams(params) {
    try {
      const response = await axios.get(`${this.xServiceUrl}/${this.resource}`, {
        params: params,
        headers: this.setHeaders(),
      });

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async create(payload) {
    try {
      const response = await axios.post(
        `${this.xServiceUrl}/${this.resource}`,
        payload,
        {
          headers: this.setHeaders(),
        }
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async update(payload) {
    try {
      const response = await axios.patch(
        `${this.xServiceUrl}/${this.resource}/${payload.id}`,
        payload,
        {
          headers: this.setHeaders(),
        }
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }
  async delete(id) {
    try {
      const response = await axios.delete(
        `${this.xServiceUrl}/${this.resource}/${id}`,
        {
          headers: this.setHeaders(),
        }
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }
}

class OrderStatusesApiServices extends BaseApiServices {
  constructor() {
    super("order-statuses");
  }

  async fetch() {
    try {
      const response = await axios.get(`${this.xServiceUrl}/${this.resource}`, {
        headers: this.setHeaders(),
      });

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async getByParams(params) {
    try {
      const response = await axios.get(`${this.xServiceUrl}/${this.resource}`, {
        params: params,
        headers: this.setHeaders(),
      });

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async create(payload) {
    try {
      const response = await axios.post(
        `${this.xServiceUrl}/${this.resource}`,
        payload,
        {
          headers: this.setHeaders(),
        }
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async update(payload) {
    try {
      const response = await axios.patch(
        `${this.xServiceUrl}/${this.resource}/${payload.id}`,
        payload,
        {
          headers: this.setHeaders(),
        }
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }
  async delete(id) {
    try {
      const response = await axios.delete(
        `${this.xServiceUrl}/${this.resource}/${id}`,
        {
          headers: this.setHeaders(),
        }
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }
}

class FilesApiServices extends BaseApiServices {
  constructor() {
    super("files");
  }
  async getByParams(params) {
    try {
      const response = await axios.get(`${this.xServiceUrl}/${this.resource}`, {
        params: params,
      });

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }
  async create(payload) {
    try {
      const response = await axios.post(
        `${this.xServiceUrl}/${this.resource}`,
        payload,
        {
          headers: this.setHeaders(),
        }
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async update(payload) {
    try {
      const response = await axios.patch(
        `${this.xServiceUrl}/${this.resource}/${payload.id}`,
        payload,
        {
          headers: this.setHeaders(),
        }
      );
      return response;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }

  async delete(id) {
    try {
      const response = await axios.delete(
        `${this.xServiceUrl}/${this.resource}/${id}`,
        {
          headers: this.setHeaders(),
        }
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return;
    }
  }
}

export const $api = {
  users: new UsersApiServices(),
  products: new ProductsApiServices(),
  warranty_cards: new WarrantyCardsApiServices(),
  shipping_addresses: new ShippingAddressesApiServices(),
  orders: new OrdersApiServices(),
  order_products: new OrderProductsApiServices(),
  order_statuses: new OrderStatusesApiServices(),
  emails: new EmailsApiService(),
  files: new FilesApiServices(),
};
