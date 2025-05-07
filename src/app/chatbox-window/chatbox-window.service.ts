import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, ElementRef } from "@angular/core";
import {
  catchError,
  from,
  Observable,
  OperatorFunction,
  tap,
  throwError,
} from "rxjs";
import { CONSTANTS, environment } from "../common/constants/constants";

@Injectable({
  providedIn: "root",
})
export class ChatComponentService {
  constructor(private _http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "Lỗi không xác định";
    console.error("Full error response:", error);
    console.error("Error URL:", error.url);
    console.error("Error status:", error.status);
    console.error("Error message:", error.message);
    console.error("Error details:", error.error);
    console.error("Error headers:", error.headers);

    if (error.status === 0) {
      errorMessage = "Mất kết nối server. Vui lòng kiểm tra mạng";
    } else if (error.status >= 400 && error.status < 500) {
      errorMessage = `Lỗi client: ${error.error?.message || error.message}`;
    } else if (error.status >= 500) {
      errorMessage = "Lỗi server. Vui lòng thử lại sau";
      console.error("Server error details:", error.error);
    }

    console.error(`[ChatService Error] ${errorMessage}`, error);
    return throwError(() => new Error(errorMessage));
  }

  getInit() {
    const url = environment.BASE_CHATBOT_URL + CONSTANTS.CHATGPT.INIT;
    console.log("Initializing chat with URL:", url);

    return this._http
      .get<any>(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .pipe(
        tap((response) => console.log("Init response:", response)),
        catchError(this.handleError)
      );
  }

  getAsk(body: any) {
    const url = environment.BASE_CHATBOT + CONSTANTS.CHATGPT.SEND_MESSAGE;

    return this._http
      .post<any>(url, body, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .pipe(
        tap((response) => console.log("Ask response:", response)),
        catchError(this.handleError)
      );
  }
}
