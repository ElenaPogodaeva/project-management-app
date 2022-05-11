import {
  IConfig,
  ICreateBoard,
  ICreateColumn,
  ICreateTask,
  ICreateUser,
  ISinginUser,
  IUpdateTask,
  IUpdateUser,
  IBoard,
} from '../model/interfaces';

const BASE_URL = 'https://react-goodie.herokuapp.com';

export default class Api {
  baseUrl: string;

  userId: string;

  userLogin: string;

  token: string;

  constructor() {
    this.baseUrl = BASE_URL;
    this.userId = localStorage.getItem('userId') as string;
    this.userLogin = localStorage.getItem('userLogin') as string;
    this.token = localStorage.getItem('token') as string;
  }

  async createResponse(
    url: string,
    method: string,
    data:
      | IUpdateUser
      | ICreateBoard
      | IBoard
      | ICreateColumn
      | ICreateTask
      | IUpdateTask
      | null = null
  ) {
    try {
      const config: IConfig = {
        method,
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      if (data) {
        config.body = JSON.stringify(data);
      }
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      return response.json();
    } catch (error) {
      return error;
    }
  }

  // Authorization

  async createUser(user: ICreateUser) {
    try {
      const response = await fetch(`${this.baseUrl}/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      const content = await response.json();
      return content;
    } catch (error) {
      return error;
    }
  }

  async loginUser(user: ISinginUser) {
    try {
      const response = await fetch(`${this.baseUrl}/signin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const content = await response.json();
      this.token = content.token;
      return content;
    } catch (error) {
      return error;
    }
  }

  // Users

  async getUsers() {
    try {
      const url = `${this.baseUrl}/users`;
      const response = await this.createResponse(url, 'GET');
      console.log(response);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getUserById(userId: string) {
    try {
      const url = `${this.baseUrl}/users/${userId}`;
      const response = await this.createResponse(url, 'GET');
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateUser(user: IUpdateUser) {
    try {
      const url = `${this.baseUrl}/users/${this.userId}`;
      const response = await this.createResponse(url, 'PUT', user);
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteUser(userId: string) {
    try {
      const url = `${this.baseUrl}/users/${userId}`;
      const response = await this.createResponse(url, 'DELETE');
      return response;
    } catch (error) {
      return error;
    }
  }

  parseJwt() {
    const data = this.token.split('.')[1];
    const decodedString = JSON.parse(atob(data));
    return decodedString;
  }

  getUserId() {
    const payLoad = this.parseJwt();
    console.log(payLoad.userId);
    return payLoad.userId;
  }

  // Boards

  async getBoards() {
    try {
      const url = `${this.baseUrl}/boards`;
      const response: IBoard[] = await this.createResponse(url, 'GET');
      return response;
    } catch (error) {
      return error;
    }
  }

  async createBoard(board: ICreateBoard) {
    try {
      const url = `${this.baseUrl}/boards`;
      const response = await this.createResponse(url, 'POST', board);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getBoardById(boardId: string) {
    try {
      const url = `${this.baseUrl}/boards/${boardId}`;
      const response = await this.createResponse(url, 'GET');
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateBoard(boardId: string, board: ICreateBoard) {
    try {
      const url = `${this.baseUrl}/boards/${boardId}`;
      const response = await this.createResponse(url, 'PUT', board);
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteBoard(boardId: string) {
    try {
      const url = `${this.baseUrl}/boards/${boardId}`;
      const response = await this.createResponse(url, 'DELETE');
      return response;
    } catch (error) {
      return error;
    }
  }

  // Columns

  async getColumns(boardId: string) {
    try {
      const url = `${this.baseUrl}/boards/${boardId}/columns`;
      const response = await this.createResponse(url, 'GET');
      return response;
    } catch (error) {
      return error;
    }
  }

  async createColumn(boardId: string, column: ICreateColumn) {
    try {
      const url = `${this.baseUrl}/boards/${boardId}/columns`;
      const response = await this.createResponse(url, 'POST', column);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getColumnById(boardId: string, columnId: string) {
    try {
      const url = `${this.baseUrl}/boards/${boardId}/columns/${columnId}`;
      const response = await this.createResponse(url, 'GET');
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateColumn(boardId: string, columnId: string, column: ICreateColumn) {
    try {
      const url = `${this.baseUrl}/boards/${boardId}/columns/${columnId}`;
      const response = await this.createResponse(url, 'PUT', column);
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteColumn(boardId: string, columnId: string) {
    try {
      const url = `${this.baseUrl}/boards/${boardId}/columns/${columnId}`;
      const response = await this.createResponse(url, 'DELETE');
      return response;
    } catch (error) {
      return error;
    }
  }

  // Tasks

  async getTasks(boardId: string, columnId: string) {
    try {
      const url = `${this.baseUrl}/boards/${boardId}/columns/${columnId}/tasks`;
      const response = await this.createResponse(url, 'GET');
      return response;
    } catch (error) {
      return error;
    }
  }

  async createTasks(boardId: string, columnId: string, task: ICreateTask) {
    try {
      const url = `${this.baseUrl}/boards/${boardId}/columns/${columnId}/tasks`;
      const response = await this.createResponse(url, 'POST', task);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getTaskById(boardId: string, columnId: string, taskId: string) {
    try {
      const url = `${this.baseUrl}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
      const response = await this.createResponse(url, 'GET');
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateTask(boardId: string, columnId: string, taskId: string, task: IUpdateTask) {
    try {
      const url = `${this.baseUrl}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
      const response = await this.createResponse(url, 'PUT', task);
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteTask(boardId: string, columnId: string, taskId: string) {
    try {
      const url = `${this.baseUrl}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
      const response = await this.createResponse(url, 'DELETE');
      return response;
    } catch (error) {
      return error;
    }
  }
}
