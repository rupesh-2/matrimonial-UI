import { API_BASE_URL } from "../constants/api";

export class ServerStatusChecker {
  static async checkServerStatus(): Promise<{
    isOnline: boolean;
    url: string;
    error?: string;
    responseTime?: number;
  }> {
    const startTime = Date.now();

    try {
      console.log(`[ServerStatus] Checking server at: ${API_BASE_URL}`);

      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
                 body: JSON.stringify({
           name: "Priya",
           email: "priya@test.com",
           password: "password123",
           password_confirmation: "password123",
         }),
        timeout: 5000, // 5 second timeout
      });

      const responseTime = Date.now() - startTime;

      if (response.ok) {
        console.log(`[ServerStatus] Server is online (${responseTime}ms)`);
        return {
          isOnline: true,
          url: API_BASE_URL,
          responseTime,
        };
      } else {
        console.log(
          `[ServerStatus] Server responded with status: ${response.status}`
        );
        return {
          isOnline: false,
          url: API_BASE_URL,
          error: `HTTP ${response.status}: ${response.statusText}`,
          responseTime,
        };
      }
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      console.error(`[ServerStatus] Server check failed:`, error);

      let errorMessage = "Unknown error";

      if (error.code === "ECONNREFUSED") {
        errorMessage = "Connection refused - Server is not running";
      } else if (error.message === "Network Error") {
        errorMessage = "Network error - Check your internet connection";
      } else if (
        error.name === "TypeError" &&
        error.message.includes("fetch")
      ) {
        errorMessage = "Network request failed";
      } else {
        errorMessage = error.message || "Unknown connection error";
      }

      return {
        isOnline: false,
        url: API_BASE_URL,
        error: errorMessage,
        responseTime,
      };
    }
  }

  static getServerInfo() {
    return {
      baseUrl: API_BASE_URL,
      endpoints: {
        health: `${API_BASE_URL}/api/register`,
        login: `${API_BASE_URL}/api/login`,
        register: `${API_BASE_URL}/api/register`,
      },
      troubleshooting: {
        androidEmulator: "Use 10.0.2.2:8000 for Android emulator",
        iosSimulator: "Use 127.0.0.1:8000 for iOS simulator",
        physicalDevice:
          "Use your computer's IP address (e.g., 192.168.1.100:8000)",
        laravelServer:
          "Make sure Laravel server is running with: php artisan serve",
      },
    };
  }
}

export default ServerStatusChecker;
