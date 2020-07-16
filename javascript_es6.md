---
permalink: "javascript/es6/"
---

Javascript ES6

{% for example in site.javascript %}
    {% if example.version == "es6" %}
        {{ example.title }}
    {% endif %}
{% endfor %}