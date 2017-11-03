{% if not (theme.duoshuo and theme.duoshuo.shortname) and not theme.duoshuo_shortname %}
  {% if theme.uyan_uid and page.comments %}
       <!-- UY BEGIN -->
        <script type="text/javascript" src="http://v2.uyan.cc/code/uyan.js?uid={{theme.uyan_uid}}"></script>
        <!-- UY END -->
  {% endif %}
{% endif %}