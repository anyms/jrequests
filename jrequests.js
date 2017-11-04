function JRequests() {
    this.get = function (callback, url, params, headers) {
        if (params === undefined) { params = {}; }
        if (headers === undefined) { headers = {} }

        var headers_keys = Object.keys(headers);
        var params_keys = Object.keys(params);
        var Response = {};

        var params_str = "";
        for (var j = 0; j < params_keys.length; j++) {
            params_str += params_keys[j] + "=" + params[params_keys[j]];
            if (j < params_keys.length - 1) {
                params_str += "&";
            }
        }
        console.log(params_str);

        Response["json"] = function () {
            return JSON.parse(Response["text"]);
        };

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4) {
                Response["status_code"] = this.status;
                Response["timeout"] = this.timeout;
                Response["content"] = this.response;
                Response["text"] = this.responseText;
                Response["url"] = this.responseURL;
                Response["status_text"] = this.statusText;
                callback(Response);
            }
        };
        xhr.open("GET", url + "?" + params_str);
        for (var i = 0; i < headers_keys.length; i++) {
            xhr.setRequestHeader(headers_keys[i], headers[headers_keys[i]]);
        }
        xhr.send(null);
    };

    this.post = function (callback, url, data, headers) {
        if (data === undefined) { data = {}; }
        if (headers === undefined) { headers = {} }

        var headers_keys = Object.keys(headers);
        var data_keys = Object.keys(data);
        var Response = {};

        var data_str = "";
        for (var j = 0; j < data_keys.length; j++) {
            data_str += data_keys[j] + "=" + data[data_keys[j]];
            if (j < data_keys.length - 1) {
                data_str += "&";
            }
        }

        Response["json"] = function () {
            return JSON.parse(Response["text"]);
        };

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4) {
                Response["status_code"] = this.status;
                Response["timeout"] = this.timeout;
                Response["content"] = this.response;
                Response["text"] = this.responseText;
                Response["url"] = this.responseURL;
                Response["status_text"] = this.statusText;
                callback(Response);
            }
        };
        xhr.open("POST", url);
        for (var i = 0; i < headers_keys.length; i++) {
            xhr.setRequestHeader(headers_keys[i], headers[headers_keys[i]]);
        }
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data_str);
    }
}