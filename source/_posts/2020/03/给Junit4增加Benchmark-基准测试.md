---
title: 给Junit4增加Benchmark(基准测试)

tags:
  - java
  - junit
categories:
  - java
  - junit
keywords: 'junit,benchmark'
toc: true
date: 2020-03-06 21:04:18
---

# [Benchmark(基准测试)](https://en.wikipedia.org/wiki/Benchmark_(computing))
> 对于程序性能的一种测试方法

Java官方对于benchmark有一个工具[JMH](http://openjdk.java.net/projects/code-tools/jmh/)

## 使用[Junit-Benchmark](http://labs.carrotsearch.com/junit-benchmarks-tutorial.html)给Junit4添加benchmark
> 

在spring-boot中编写对比List的add方法性能的测试用例如下

```java
@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpringBootTestApplication.class)
public class ListInsertTest {
        private List<Long> arrayList;
	private List<Long> linkedList;
	private long dataSize = 10000;
	/**
	 * 每次执行 @{@link Test} 方法之前执行
	 * @throws Exception
	 */
	@Before
	public void setUp() throws Exception {
		arrayList = new ArrayList<>(10240);
		linkedList = new LinkedList<>();
		log.info("setup");
	}

	@Test
	public void testArrayListAdd() {
		long start = System.currentTimeMillis();
		LongStream.range(0, dataSize).boxed().forEach(arrayList::add);
		long costTime = System.currentTimeMillis() - start;
		log.info("arrayList add [{}] data, cost time:[{}]ms", dataSize, costTime);
	}

	@Test
	public void testLinkedListAdd() {
		long start = System.currentTimeMillis();
		LongStream.range(0, dataSize).boxed().forEach(linkedList::add);
		long costTime = System.currentTimeMillis() - start;
		log.info("linkedList add [{}] data, cost time:[{}]ms", dataSize, costTime);
	}	
}
```
执行后输出

```code
21:36:18.747 [main] INFO com.xyz327.test.ListAddTest - setup
21:36:18.812 [main] INFO com.xyz327.test.ListAddTest - linkedList add [10000] data, cost time:[62]ms
21:36:18.815 [main] INFO com.xyz327.test.ListAddTest - setup
21:36:18.818 [main] INFO com.xyz327.test.ListAddTest - arrayList add [10000] data, cost time:[3]ms
```

可以看到一个基础的数据对比。但是做性能测试是需要做多次取一个平均值才能更有说服力的。这里就需要`benchmark`，可以使用 `junit-benchmark` 给junit4代码加上 `benchmark`

1. 给项目添加`junit-benchmark`依赖
    ```xml
       <dependency>
            <groupId>com.carrotsearch</groupId>
            <artifactId>junit-benchmarks</artifactId>
            <version>0.7.2</version>
            <scope>test</scope>
        </dependency>
    ```

2. 给junit代码添加benchmark相关注解
    ```java
	@Slf4j
	@BenchmarkOptions(benchmarkRounds = REPEAT_TIMES, callgc = false, warmupRounds = WARM_UP_ROUNDS)
	@BenchmarkMethodChart(filePrefix = "测试List新增数据,重复" + InvStockDetailBatchInsertTest.REPEAT_TIMES + "次,预热"+WARM_UP_ROUNDS+"次结果")
	public class ListAddTest extends AbstractBenchmark {
		/**
	 	* 预热次数
		 */
		public static final int WARM_UP_ROUNDS = 2;
		/**
		 * 循环次数
		 */
		public static final int REPEAT_TIMES = 10;
		private List<Long> arrayList;
		private List<Long> linkedList;
		private long dataSize = 10000;


		/**
		 * 每次执行 @{@link Test} 方法之前执行
		 * @throws Exception
		 */
		@Before
		public void setUp() throws Exception {
			arrayList = new ArrayList<>(10240);
			linkedList = new LinkedList<>();
		}

		@Test
		public void testArrayListAdd() {
			LongStream.range(0, dataSize).boxed().forEach(arrayList::add);
		}

		@Test
		public void testLinkedListAdd() {
			LongStream.range(0, dataSize).boxed().forEach(linkedList::add);
		}
	}

    ```

3. 运行可以在控制台看到相关打印(时间单位: 秒)
     ```code
	ListAddTest.testLinkedListAdd: [measured 10 out of 12 rounds, threads: 1 (sequential)]
 	round: 0.00 [+- 0.00], round.block: 0.00 [+- 0.00], round.gc: 0.00 [+- 0.00], GC.calls: 0, GC.time: 0.00, time.total: 0.07, time.warmup: 0.06, time.bench: 0.01
	ListAddTest.testArrayListAdd: [measured 10 out of 12 rounds, threads: 1 (sequential)]
 	round: 0.00 [+- 0.00], round.block: 0.00 [+- 0.00], round.gc: 0.00 [+- 0.00], GC.calls: 0, GC.time: 0.00, time.total: 0.01, time.warmup: 0.00, time.bench: 0.01
    ```

4. 进一步,给结果添加chart图表显示, 在代码中添加
    ```java
	@Slf4j
	@BenchmarkOptions(benchmarkRounds = REPEAT_TIMES, callgc = false, warmupRounds = WARM_UP_ROUNDS)
	@BenchmarkMethodChart(filePrefix = "测试List新增数据,重复" + InvStockDetailBatchInsertTest.REPEAT_TIMES + "次,预热"+WARM_UP_ROUNDS+"次结果")
	public class ListAddTest extends AbstractBenchmark {
		/**
	 	* 预热次数
	 	*/
		public static final int WARM_UP_ROUNDS = 2;
		/**
		 * 循环次数
		 */
		public static final int REPEAT_TIMES = 10;
		private List<Long> arrayList;
		private List<Long> linkedList;
		private long dataSize = 10000;

		@BeforeClass
		public static void beforeClass() throws Exception {
			// 设置结果写入文件
			// 设置把结果输出到 console和 h2 中
			System.setProperty(CONSUMERS_PROPERTY, String.join(",", ConsumerName.CONSOLE.name(), ConsumerName.H2.name()));
			// 设置结果图标html文件保存的位置
			System.setProperty(CHARTS_DIR_PROPERTY, "benchmarks/list");
			// 设置db文件保存位置
			System.setProperty(DB_FILE_PROPERTY, "benchmarks/data/H2-list-add");
			// 自定义key
			System.setProperty(CUSTOMKEY_PROPERTY, System.getProperty("java.version"));
		}

		/**
		 * 每次执行 @{@link Test} 方法之前执行
		 * @throws Exception
		 */
		@Before
		public void setUp() throws Exception {
			arrayList = new ArrayList<>(10240);
			linkedList = new LinkedList<>();
		}

		@Test
		public void testArrayListAdd() {
			LongStream.range(0, dataSize).boxed().forEach(arrayList::add);
		}

		@Test
		public void testLinkedListAdd() {
			LongStream.range(0, dataSize).boxed().forEach(linkedList::add);
		}
	}
    ```

5. 在运行程序后在对应的目录下就可以看到对应的html文件,浏览器打开html就是本次benchmark的结果展示，如下图
   ![image.png](http://cdn.xyz327.cn/Fmpp9Uq136kSEfzhAcwq3klmXDpL)