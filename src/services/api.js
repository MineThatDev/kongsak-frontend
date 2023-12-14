import axios from "axios";
import emailjs from "emailjs-com";

class BaseApiServices {
  serviceUrl = process.env.VUE_APP_SERVICE_URL;
  // xServiceUrl = process.env.VUE_APP_XSERVICE_URL;
  xServiceUrl = "/xapi";
  constructor(resource) {
    if (!resource) throw new Error("Resource is not provided");
    this.resource = resource;
  }

  handleErrors(error) {
    console.log({ message: "Errors is handled here", error });
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
      return false;
    }
  }
}

class UsersApiServices extends BaseApiServices {
  constructor() {
    super("users");
  }

  async fetch() {
    try {
      const response = await axios.get(`${this.xServiceUrl}/${this.resource}`);

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return false;
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
      return false;
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
      return false;
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
      return false;
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
      return false;
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
      return false;
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
      return false;
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
      return false;
    }
  }

  async update(payload) {
    try {
      const response = await axios.patch(
        `${this.xServiceUrl}/${this.resource}/${payload.id}`,
        payload
      );
      return response;
    } catch (error) {
      this.handleErrors(error);
      return false;
    }
  }

  async delete(id) {
    try {
      const response = await axios.delete(
        `${this.xServiceUrl}/${this.resource}/${id}`
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return false;
    }
  }
}

class ShippingAddressesApiServices extends BaseApiServices {
  constructor() {
    super("shipping-addresses");
  }

  async fetch() {
    try {
      const response = await axios.get(`${this.xServiceUrl}/${this.resource}`);

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return false;
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
      return false;
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
      return false;
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
      return false;
    }
  }

  async update(payload) {
    try {
      const response = await axios.patch(
        `${this.xServiceUrl}/${this.resource}/${payload.id}`,
        payload
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return false;
    }
  }
  async delete(id) {
    try {
      const response = await axios.delete(
        `${this.xServiceUrl}/${this.resource}/${id}`
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return false;
    }
  }
}

class WarrantyCardsApiServices extends BaseApiServices {
  constructor() {
    super("warranty-cards");
  }

  async fetch() {
    try {
      const response = await axios.get(`${this.xServiceUrl}/${this.resource}`);

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return false;
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
      return false;
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
      return false;
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
      return false;
    }
  }

  async update(payload) {
    try {
      const response = await axios.patch(
        `${this.xServiceUrl}/${this.resource}/${payload.id}`,
        payload
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return false;
    }
  }
  async delete(id) {
    try {
      const response = await axios.delete(
        `${this.xServiceUrl}/${this.resource}/${id}`
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return false;
    }
  }
}

class OrdersApiServices extends BaseApiServices {
  constructor() {
    super("orders");
  }

  async fetch() {
    try {
      const response = await axios.get(`${this.xServiceUrl}/${this.resource}`);

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return false;
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
      return false;
    }
  }

  async create(payload) {
    try {
      const response = await axios.post(
        `${this.xServiceUrl}/${this.resource}`,
        payload
      );
      if (response) {
        return response;
      }
    } catch (error) {
      this.handleErrors(error);
      return false;
    }
  }

  async update(payload) {
    try {
      const response = await axios.patch(
        `${this.xServiceUrl}/${this.resource}/${payload.id}`,
        payload
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return false;
    }
  }
  async delete(id) {
    try {
      const response = await axios.delete(
        `${this.xServiceUrl}/${this.resource}/${id}`
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return false;
    }
  }
}

class OrderProductsApiServices extends BaseApiServices {
  constructor() {
    super("order-products");
  }

  async fetch() {
    try {
      const response = await axios.get(`${this.xServiceUrl}/${this.resource}`);

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return false;
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
      return false;
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
      return false;
    }
  }

  async update(payload) {
    try {
      const response = await axios.patch(
        `${this.xServiceUrl}/${this.resource}/${payload.id}`,
        payload
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return false;
    }
  }
  async delete(id) {
    try {
      const response = await axios.delete(
        `${this.xServiceUrl}/${this.resource}/${id}`
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return false;
    }
  }
}

class OrderStatusesApiServices extends BaseApiServices {
  constructor() {
    super("order-statuses");
  }

  async fetch() {
    try {
      const response = await axios.get(`${this.xServiceUrl}/${this.resource}`);

      return response.data;
    } catch (error) {
      this.handleErrors(error);
      return false;
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
      return false;
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
      return false;
    }
  }

  async update(payload) {
    try {
      const response = await axios.patch(
        `${this.xServiceUrl}/${this.resource}/${payload.id}`,
        payload
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return false;
    }
  }
  async delete(id) {
    try {
      const response = await axios.delete(
        `${this.xServiceUrl}/${this.resource}/${id}`
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return false;
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
      return false;
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
      return false;
    }
  }

  async update(payload) {
    try {
      const response = await axios.patch(
        `${this.xServiceUrl}/${this.resource}/${payload.id}`,
        payload
      );
      return response;
    } catch (error) {
      this.handleErrors(error);
      return false;
    }
  }

  async delete(id) {
    try {
      const response = await axios.delete(
        `${this.xServiceUrl}/${this.resource}/${id}`
      );

      return response;
    } catch (error) {
      this.handleErrors(error);
      return false;
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
