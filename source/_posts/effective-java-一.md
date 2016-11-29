---
title: effective java(一)
date: 2016-03-14 21:52:18
tags: effective java
---
##考虑使用静态工厂方法代替构造器


###静态工厂方法相比构造器的<font color="red">优势</font>：
1. 它们有名称_。根据方法名字可以清楚的知道可以获得什么样子的对象
2. 不必再每次调用的时候都创建一个新对象。
3. 它们可以返回原返回类型的任何子类型的对象。    
4. 在创建参数化类型实例的时候，它们是代码变得更加简洁    
<!-- more -->
```java
         //Service provider framework sketch(描述)

         //Service interface
         public interface Service{
            ...//service specific methods
         }

         //Service provider interface
         public interface Provider{
            public Service newService();
         }

         //noninstantiable(不可实例化的) class for service registration and success
         public class Services{
            //prevents instantiation (阻止实例化)
            private Services{

            }
            //maps service name for services
            private static final Map<String, Provider> providers =
                new ConcurrentHashMap<String, Provider>();
            //
            public static final String DEFAULT_PROVIDER_NAME = "<def>";
            //provider registration API
            public static void registerDefaultProvider(Provider p){
                registerProvider(DEFAULT_PROVIDER_NAME, p);
            }
            public static void registerProvider(String name, Provider p){
                providers.put(name, p);
            }

            //Services access API
            public static Service newInstance(){
                return newInstance(DEFAULT_PROVIDER_NAME);
            }
            public static Service newInstance(String name){
                Provider p = providers.get(name);
                if(p == null){
                    throw new IllegalArgumentException(
                        "No provider register with name :" + name);
                }
                return p;
            }
         }

```

###静态工厂方法的主要<font color="red">缺点</font>:
1. _类如果不含公有的或者受保护的构造器，就不能被子类化_
2. _它们其他的静态方法实际上没有任何区别_
    下面是静态工厂方法的一些惯用名称
```java
        valueOf  —————— 不太严格的讲，改方法返回的实例与它的参数具有相同的值。这样的静态工厂方法实际上是类型转换方法

        of —————— valueOf 的一种更为简洁的替代，在EnummSet中使用并流行起来

        getInstance —————— 返回的实例通过方法的参数描述的，但是不能够说与参数具有同样的值，对于singleton来说，该方法没有参数并返回唯一实例

        newInstance —————— 与getInstance一样，但是newInstance能确保返回的每个实例都与其他实例不同

        getType —————— 与getInstance一样，但是在工厂方法处于不同类中的时候使用，Type表示工厂方法所返回的对象类型

        newType —————— 像newInstance一样，但是在工厂方法处于不同类中的时候使用，Type表示工厂方法所返回的对象类型

```

##遇到多个构造器参数时考虑使用构建器

```java

    //Builder pattern
    public class NutritionFacts{
        private final int servingSize;
        private final int servings;
        private final int calories;
        private final int fat;
        private final int sodium;
        private final int carbohydrate;

        public static calss Builder{
            //Required parameter
            private final int servingSize;
            private final int servings;

            //optional parameter -- initialized to default value
            private int calories = 0;
            private int fat = 0;
            private int carbohydrate = 0;
            private int sodium = 0;

            public Builder(int servingSize, int servings){
                this.servingSize = servingSize;
                this.servings = servings;
            }
            public Builder calories(int calories){
                this.calories = calories;
                return this;
            }
            public Builder fat(int fat){
                this.fat = fat;
                return this;
            }
            public Builder carbohydrate(int carbohydrate){
                this.carbohydrate = carbohydrate;
                return this;
            }
            public Builder sodium(int sodium){
                this.sodium = sodium;
                return this;
            }

            public NutritionFacts build(){
                return this;
            }
        }
        private NutritionFacts(Builder builder){
            servingSize = builder.servingSize;
            servings = builder.servings;
            calories = builder.calories;
            fat = build.fat;
            sodium = build.sodium;
            carbohydrate = build.carbohydrate;
        }
    }

    //Test
    NutritionFacts cocaCola = new NutritionFacts.Builder(240, 2).calories(2)
                                .fat(2).carbohydrate(2).sodium(0).build();
```
