---
layout: post
title:  "How to build Social Media Links for Jekyll"
date:   2017-07-01 12:00:00 +0300
categories: web-dev jekyll
comments: true
image-folder: 2017-07-01-social-media-links-jekyll
featured-image: social-links.png
excerpt: In this post I will show you how to integrate social links using Jekyll in a simple yet effective way..
---

***

![social-links]({{ site.image-path | relative_url }}/{{ page.image-folder }}/social-links.png){:class="img-responsive"}

***

I always try to avoid hard coding during software development as it is usually ineffective and risks being highly counterproductive. In this post I will show you how to integrate social links for your website using Jekyll in a simple yet effective way, while avoiding hard coding and following some basic software development principles.

***

### Starting Simple

If we try to keep it as [simple](https://en.wikipedia.org/wiki/KISS_principle) as possible we need to define a set of social media links by creating an unordered list using the `<ul></ul>` HTML tag. Inside that we add list items using `<li></li>` tag that will contain our link `<a></a>` tags.

{% highlight html %}
<ul class="social-links">
  <li><a href="https://www.facebook.com/my-facebook-username">Facebook</a></li>
  <li><a href="https://plus.google.com/my-gplus-username">Google+</a></li>
  <li><a href="https://linkedin.com/in/my-linkedin-username">linkedin</a></li>
</ul>
{% endhighlight %}

***

### Yaml Configuration

The next step is to draw out the link and define it in a more parametric way. For that we need to define our variables for the links in the `_config.yml` file.

{% highlight yaml %}
facebook:     "https://www.facebook.com/my-facebook-username"
google-plus:  "https://plus.google.com/my-gplus-username"
linkedin:     "https://linkedin.com/in/my-linkedin-username"
{% endhighlight %}

Inside our HTML code we will make use of the of [liquid tags](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) to automatically fetch the above variables. Notice that the variables created in the `_config.yml` site can be accessed through the `site` variable.

{% highlight html %}
<ul class="social-links">
  {% raw %}{% if site.facebook %}{% endraw %}
    <li><a href="{% raw %}{{ site.facebook }}{% endraw %}">Facebook</a></li>
  {% raw %}{% endif %}{% endraw %}
  {% raw %}{% if site.google-plus %}{% endraw %}
    <li><a href="{% raw %}{{ site.google-plus }}{% endraw %}">Google+</a></li>
  {% raw %}{% endif %}{% endraw %}
  {% raw %}{% if site.linkedin %}{% endraw %}
    <li><a href="{% raw %}{{ site.linkedin }}{% endraw %}">Linkedin</a></li>
  {% raw %}{% endif %}{% endraw %}
</ul>
{% endhighlight %}

***

### Don't Repeat Yourself!

While the links are now defined a proper place (configuration file), the HTML code definitely has room for improvement by following the [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) principle . Instead of defining each link separately, we could group them together and have the code dynamically read and create the link for us. That will allow easier modifications in the future, such as adding or removing a link.

The first step is to group the variables in the `_config.yml` file.

{% highlight yaml %}
social_links:
  facebook:     "https://www.facebook.com/my-facebook-username"
  google-plus:  "https://plus.google.com/my-gplus-username"
  linkedin:     "https://linkedin.com/in/my-linkedin-username"
{% endhighlight %}

Using the above declaration each link is contained inside the `social_links` variable. We will use a `for` loop using liquid tags inside our HTML code to access each one of them.

{% highlight html %}
<ul class="social-links">
  {% raw %}{% for social_link in site.social_links %}{% endraw %}
    {% raw %}{% if social_link[1] != "" %}{% endraw %}
      <li><a href="{% raw %}{{ social_link[1] }}{% endraw %}">{% raw %}{{ social_link[0] }}{% endraw %}</a></li>
    {% raw %}{% endif %}{% endraw %}
  {% raw %}{% endfor %}{% endraw %}
</ul>
{% endhighlight %}

Notice that the `social_links` variable is similar to a dictionary. Each link is defined by a _key-value_ pair. The key is accessed by `social_link[0]` and the value by `social_link[1]`.

***

### Adding the Awesome Fonts

If you need to add icons to your links instead of text, you could use of course the font icons provided by [Font Awesome](http://fontawesome.io/icons/). Be sure to check them out, as their fonts are indeed awesome! Just include the link below in the webpage and you are ready to use the fonts.

{% highlight html %}
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
{% endhighlight %}

In order to intergrate properly with the font-awesome libraries, I defined the social links key variables by using the same name as the font-awesome css classes. For example, the icon I wanted to use for facebook has the class `fa-facebook`, and so the key for this link is defined using the word after `fa-`.

The final code is found below. All that left is to add CSS styling and you are done!

{% highlight html %}
<ul class="social-links">
  {% raw %}{% for social_link in site.social_links %}{% endraw %}
    {% raw %}{% if social_link[1] != "" %}{% endraw %}
      <li><a href="{% raw %}{{ social_link[1] }}{% endraw %}" title="{% raw %}{{ social_link[0] }}{% endraw %}">
        <i class="fa fa-{% raw %}{{ social_link[0] }}{% endraw %}" aria-hidden="true"></i>
      </a></li>
    {% raw %}{% endif %}{% endraw %}
  {% raw %}{% endfor %}{% endraw %}
</ul>
{% endhighlight %}

***

### Any ideas?

Of course there are numerous ways to implement the above scenario. This post examines an effective and simple way to tackle this case.

Feel free to add your own ideas and thoughts in the comments section below!

***
