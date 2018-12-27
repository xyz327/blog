<div class="copyright" >
  {% set current = date(Date.now(), "YYYY") %}
  &copy; {% if theme.since and theme.since != current %} {{ theme.since }} - {% endif %}
  <span itemprop="copyrightYear">{{ current }}</span>
  <span class="with-love">
    <i class="fa fa-heart"></i>
  </span>
  <span class="author" itemprop="copyrightHolder">{{ config.author }}</span>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="http://www.miitbeian.gov.cn/">    粤ICP备18053302号-1</a>
</div>

{% if theme.copyright %}
<div class="powered-by">
  {{ __('footer.powered', '<a class="theme-link" href="https://hexo.io" rel="external nofollow">Hexo</a>') }}
</div>
<style>
  .hosted-info {
    display: inline-block;
  }
  .theme-info::after {
    content: "|";
    padding-left: 10px;
  }
  .theme-info {
    margin-right: 10px;
  }
  .icp-info {
    display: block;
  }
</style>
<div class="theme-info">
  {{ __('footer.theme') }} -
  <a class="theme-link" href="https://github.com/iissnan/hexo-theme-next" rel="external nofollow">
    NexT.{{ theme.scheme }}
  </a>
</div>

<div class="hosted-info">
  <p>Hosted by <a href="https://pages.coding.me" style="font-weight: bold">Coding Pages</a></p>
</div>
<div class="icp-info">
  
</div>

{% endif %}
