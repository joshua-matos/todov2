package com.joshuamatos.todopractice1.exception;

public class ApiException extends RuntimeException {
    private Throwable throwable;
    private String message;

    public ApiException(String message) {
        super(message);
        this.message = message;
    }

    public ApiException(Throwable throwable, String message) {
        this.throwable = throwable;
        this.message = message;
    }

    public ApiException(String message, Throwable throwable, String message1) {
        super(message);
        this.throwable = throwable;
        this.message = message1;
    }

    public ApiException(String message, Throwable cause, Throwable throwable, String message1) {
        super(message, cause);
        this.throwable = throwable;
        this.message = message1;
    }

    public ApiException(Throwable cause, Throwable throwable, String message) {
        super(cause);
        this.throwable = throwable;
        this.message = message;
    }

    public ApiException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace, Throwable throwable, String message1) {
        super(message, cause, enableSuppression, writableStackTrace);
        this.throwable = throwable;
        this.message = message1;
    }
}
