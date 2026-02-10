<script>
  // 按钮组变量
  let pseudoOrder = $state('正点先出'); // 伪人顺序
  let mobA = $state('打左右'); // A小怪
  let avatarA = $state('分摊'); // 正点分身
  let myPosition = $state(''); // 我的位置（环形按钮）
  let blackhole = $state('吸A'); // 黑洞
  let cloneDrift = $state('B安全'); // 分身漂移

  // 根据变量计算回想内容
  let mobAResult = $derived(mobA === '打左右' ? '23安全' : '14安全');
  let cardinalCloneResult = $derived(avatarA);
  let blackholeResult = $derived(blackhole === '吸A' ? 'A被吸' : 'C被吸');
  let mobSafeZone = $derived((mobA === '打左右') === (blackholeResult === 'C被吸') ? '左右安全' : '前后安全');

  let solution = $state('盗火改'); // 解法
  let solutionPseudo = {
    '盗火改': [
      '找自己连线的伪人',
      '[A][B][3][4]准备接分摊',
      '[1][C]准备接钢铁（先出）',
      '[2][D]准备接钢铁（后出）'
    ],
  }
  let solutionAvatar = {
    '盗火改': '同色点接线；[A][B][3][4]接分摊，[C][D][1][2]接钢铁',
  }
  let solution44Avatar = {
    '盗火改': {
      '分摊': [
        '[A][1][B][2]在1号点，[C][3][D][4]在4号点',
        '[1]出人群到2号点外，[C]出人群到3号点外',
        '[A][1][B][2]在1号点，[C][3][D][4]在4号点',
        '[2]出人群到2号点外，[D]出人群到3号点外',
      ],
      '钢铁': [
        '[1]出人群到2号点外，[C]出人群到3号点外',
        '[A][1][B][2]在1号点，[C][3][D][4]在4号点',
        '[2]出人群到2号点外，[D]出人群到3号点外',
        '[A][1][B][2]在1号点，[C][3][D][4]在4号点',
      ],
    },
  }

  // 解析带标记的文本，返回 {text, isPosition}[] 数组
  function parsePositionText(text) {
    const parts = [];
    let lastIndex = 0;
    const regex = /\[([A-D1-4])\]/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ text: text.slice(lastIndex, match.index), isPosition: false });
      }
      parts.push({ text: match[1], isPosition: true, pos: match[1] });
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push({ text: text.slice(lastIndex), isPosition: false });
    }
    return parts;
  }
  let solution44Pseudo = {
    '盗火改': {
      '正点先出': ['MT组去A，ST组去B', 'MT组去4，ST组去3'],
      '斜点先出': ['MT组去4，ST组去3', 'MT组去A，ST组去B'],
    },
  }
</script>

<main>
  <!-- 第1块：转场 -->
  <section class="block white">
    <div class="content">
      <h2>《境中奇梦》转场高伤</h2>
    </div>
    <div class="button-group">
      <span class="label">【解法】</span>
      <button class:active={solution === '盗火改'} onclick={() => solution = '盗火改'}>盗火改</button>
    </div>
  </section>

  <!-- 第2块：模仿细胞 - 绿色 -->
  <section class="block green">
    <div class="content">
      <h2>《模仿细胞》8伪人连线</h2>
      <div class="button-group">
        <span class="label">【伪人顺序】</span>
        <button class:active={pseudoOrder === '正点先出'} onclick={() => pseudoOrder = '正点先出'}>正点先出</button>
        <button class:active={pseudoOrder === '斜点先出'} onclick={() => pseudoOrder = '斜点先出'}>斜点先出</button>
      </div>

      <div style="display:flex">
        <div class="note">
          <p class="note-title">[{solution}]</p>
          <ol class="rounds-list">
            {#each solutionPseudo[solution] as round}
              <li>
                {#each parsePositionText(round) as part}
                  {#if part.isPosition}
                    <span class="pos-mark" class:highlight={myPosition === part.pos}>{part.text}</span>
                  {:else}
                    {part.text}
                  {/if}
                {/each}
              </li>
            {/each}
          </ol>
        </div>
        <!-- 环形按钮组 -->
        <div class="circle-buttons">
          <button class="pos-btn red" class:active={myPosition === 'A'} style="--angle: 0deg" onclick={() => myPosition = 'A'}>A</button>
          <button class="pos-btn red" class:active={myPosition === '1'} style="--angle: 45deg" onclick={() => myPosition = '1'}>1</button>
          <button class="pos-btn yellow" class:active={myPosition === 'B'} style="--angle: 90deg" onclick={() => myPosition = 'B'}>B</button>
          <button class="pos-btn yellow" class:active={myPosition === '2'} style="--angle: 135deg" onclick={() => myPosition = '2'}>2</button>
          <button class="pos-btn blue" class:active={myPosition === 'C'} style="--angle: 180deg" onclick={() => myPosition = 'C'}>C</button>
          <button class="pos-btn blue" class:active={myPosition === '3'} style="--angle: 225deg" onclick={() => myPosition = '3'}>3</button>
          <button class="pos-btn purple" class:active={myPosition === 'D'} style="--angle: 270deg" onclick={() => myPosition = 'D'}>D</button>
          <button class="pos-btn purple" class:active={myPosition === '4'} style="--angle: 315deg" onclick={() => myPosition = '4'}>4</button>
          <span class="circle-center">{myPosition || '?'}</span>
        </div>
      </div>
      

    </div>
  </section>

  <!-- 第3块：3小怪 - 蓝色 -->
  <section class="block blue">
    <div class="content">
      <h2>《自我复制》3小怪出现</h2>
      <div class="button-group">
        <span class="label">【A小怪方向】</span>
        <button class:active={mobA === '打左右'} onclick={() => mobA = '打左右'}>打左右 (23安全)</button>
        <button class:active={mobA === '打上下'} onclick={() => mobA = '打上下'}>打上下 (14安全)</button>
      </div>
    </div>
  </section>

  <!-- 第4块：8分身 - 绿色 -->
  <section class="block green">
    <div class="content">
      <h2>《自我复制》8分身出现，接线</h2>
      <div class="note">
        <p>[{solution}] {#each parsePositionText(solutionAvatar[solution]) as part}
                {#if part.isPosition}
                  <span class="pos-mark" class:highlight={myPosition === part.pos}>{part.text}</span>
                {:else}
                  {part.text}
                {/if}
              {/each}</p>
      </div>

      <div class="button-group">
        <span class="label">【正点分身】</span>
        <button class:active={avatarA === '分摊'} onclick={() => avatarA = '分摊'}>分摊</button>
        <button class:active={avatarA === '钢铁'} onclick={() => avatarA = '钢铁'}>钢铁</button>
      </div>
      
      <div class="recall">
        <span class="recall-label">线变实后，回想【A小怪方向】，躲扇形</span>
        <span class="recall-value">{mobAResult}</span>
      </div>
    </div>
  </section>

  <!-- 第5块：林德布鲁姆陨石 - 蓝色 -->
  <section class="block blue">
    <div class="content">
      <h2>《林德布鲁姆陨石》高伤，小世界</h2>
      <p>提前站位，MT组去D，ST组去B</p>
      <p>踩塔预站位分散，TN左D右（面向boss）</p>
      <p>横向换位，光易伤的踩单色塔；记住塔后进目标圈</p>
    </div>
  </section>

  <!-- 第6块：分身判定 - 绿色 -->
  <section class="block green">
    <div class="content">
      <h2>分身依次判定</h2>
      <div class="recall">
        <span class="recall-label">回想【正点分身】</span>
        <span class="recall-value">{cardinalCloneResult}</span>
        <span class="recall-desc">→ 按接线分组分摊</span>
      </div>
      <div class="note">
        <p class="note-title">[{solution}]</p>
        <ol class="rounds-list">
          {#each solution44Avatar[solution][avatarA] as round}
            <li>
              {#each parsePositionText(round) as part}
                {#if part.isPosition}
                  <span class="pos-mark" class:highlight={myPosition === part.pos}>{part.text}</span>
                {:else}
                  {part.text}
                {/if}
              {/each}
            </li>
          {/each}
        </ol>
      </div>
    </div>
  </section>

  <!-- 第7块：踩塔 - 蓝色 -->
  <section class="block blue">
    <div class="content">
      <h2>恢复踩塔时BD站位</h2>
      <div class="tower-grid">
        <div class="tower dark">
          <p>往外引导激光，死宣</p>
        </div>
        <div class="tower fire">
          <p>不要移动</p>
        </div>
        <div class="tower wind">
          <p>靠近塔边向对面击飞</p>
        </div>
        <div class="tower earth">
          <p>躲石笋</p>
        </div>
      </div>
      <p>引导远近扇形打人</p>
      <div class="button-group">
        <span class="label">【黑洞吸走1小怪】</span>
        <button class:active={blackhole === '吸A'} onclick={() => blackhole = '吸A'}>吸A</button>
        <button class:active={blackhole === '吸C'} onclick={() => blackhole = '吸C'}>吸C</button>
      </div>
      <div class="button-group">
        <span class="label">【AC分身漂移】</span>
        <button class:active={cloneDrift === 'B安全'} onclick={() => cloneDrift = 'B安全'}>B安全</button>
        <button class:active={cloneDrift === 'D安全'} onclick={() => cloneDrift = 'D安全'}>D安全</button>
      </div>
    </div>
  </section>

  <!-- 第8块：第1批伪人 - 绿色 -->
  <section class="block green">
    <div class="content">
      <h2>第1批伪人判定</h2>
      <div class="recall">
        <span class="recall-label">回想【伪人顺序】</span>
        <span class="recall-value">{pseudoOrder}</span>
      </div>
      <div class="note">
        <p>[{solution}] {solution44Pseudo[solution][pseudoOrder][0]}</p>
      </div>
    </div>
  </section>

  <!-- 第9块：安全区躲避 - 蓝色 -->
  <section class="block blue">
    <div class="content">
      <h2>2小怪判定</h2>
      <div class="recall-multi">
        <div class="recall">
          <span class="recall-label">回想【分身漂移】【A小怪方向】【黑洞】</span>
          <span class="recall-value">{cloneDrift} {mobA} {blackholeResult}</span>
          <span class="recall-desc">→ {cloneDrift[0]}{mobSafeZone}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- 第10块：第2批伪人 - 绿色 -->
  <section class="block green">
    <div class="content">
      <h2>第2批伪人判定</h2>
      <div class="recall">
        <span class="recall-label">回想【伪人顺序】</span>
        <span class="recall-value">{pseudoOrder === '正点先出' ? '斜点' : '正点'}</span>
      </div>
      <div class="note">
        <p>[{solution}] {solution44Pseudo[solution][pseudoOrder][1]}</p>
      </div>
      
      <h3>1小怪判定</h3>
      <div class="recall-multi">
        <div class="recall">
          <span class="recall-label">回想【A小怪方向】【黑洞】</span>
          <span class="recall-value">{mobA} {blackholeResult}</span>
          <span class="recall-desc">→ {mobSafeZone}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- 第11块：结束 - 白色 -->
  <section class="block white">
    <div class="content">
      <h2>《境中奇梦》转场高伤</h2>
    </div>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
    background: #1a1a2e;
  }

  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  .block {
    border-radius: 12px;
    margin-bottom: 16px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }

  .block.green {
    background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
    border-left: 5px solid #28a745;
  }

  .block.blue {
    background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%);
    border-left: 5px solid #17a2b8;
  }

  .block.white {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-left: 5px solid #6c757d;
  }

  .content {
    padding: 20px 24px;
  }

  h2 {
    margin: 0 0 12px 0;
    font-size: 1.3rem;
    color: #2c3e50;
  }

  h3 {
    margin: 16px 0 8px 0;
    font-size: 1.1rem;
    color: #2c3e50;
    border-top: 1px dashed #aaa;
    padding-top: 12px;
  }

  p {
    margin: 8px 0;
    color: #495057;
    line-height: 1.6;
  }

  .highlight {
    color: #dc3545;
    font-weight: bold;
    font-size: 1.1rem;
  }

  .note {
    background: rgba(0, 0, 0, 0.05);
    padding: 10px 15px;
    border-radius: 8px;
    margin: 12px 0;
    border-left: 3px solid #6c757d;
  }

  .note p {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
  }

  .note-title {
    font-weight: bold;
    margin-bottom: 8px !important;
  }

  .rounds-list {
    margin: 0;
    padding-left: 1.5em;
    font-size: 0.9rem;
    color: #555;
  }

  .rounds-list li {
    margin: 4px 0;
    line-height: 1.5;
  }

  .pos-mark {
    font-weight: bold;
  }

  .pos-mark.highlight {
    background: #ffc107;
    color: #212529;
    padding: 1px 4px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  .button-group {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 16px 0;
    flex-wrap: wrap;
  }

  .label {
    font-weight: bold;
    color: #2c3e50;
    min-width: 100px;
  }

  button {
    padding: 8px 16px;
    border: 2px solid #6c757d;
    border-radius: 20px;
    background: white;
    cursor: pointer;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    color: #495057;
  }

  button:hover {
    background: #e9ecef;
    transform: translateY(-1px);
  }

  button.active {
    background: #007bff;
    border-color: #007bff;
    color: white;
    box-shadow: 0 2px 8px rgba(0, 123, 255, 0.4);
  }

  .recall {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255, 193, 7, 0.2);
    padding: 10px 15px;
    border-radius: 8px;
    margin: 10px 0;
    border: 1px solid rgba(255, 193, 7, 0.5);
    flex-wrap: wrap;
  }

  .recall-label {
    font-weight: bold;
    color: #856404;
  }

  .recall-value {
    background: #ffc107;
    color: #212529;
    padding: 4px 12px;
    border-radius: 15px;
    font-weight: bold;
    font-size: 1rem;
  }

  .recall-desc {
    color: #666;
  }

  .recall-multi {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .tower-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 15px 0;
  }

  .tower {
    padding: 12px;
    border-radius: 8px;
    text-align: center;
  }

  .tower p {
    margin: 0;
    font-size: 0.9rem;
  }

  .tower.dark {
    background: linear-gradient(135deg, #3a3a5a 0%, #2a2a4a 100%);
    color: #fff;
  }

  .tower.dark p {
    color: #ddd;
  }

  .tower.wind {
    background: linear-gradient(135deg, #a8e6cf 0%, #88d8b0 100%);
    color: #1a5c3a;
  }

  .tower.wind p {
    color: #2a7c4a;
  }

  .tower.fire {
    background: linear-gradient(135deg, #ffb3ba 0%, #ff8a8a 100%);
    color: #8b0000;
  }

  .tower.fire p {
    color: #a52a2a;
  }

  .tower.earth {
    background: linear-gradient(135deg, #d4a574 0%, #c49a6c 100%);
    color: #4a3520;
  }

  .tower.earth p {
    color: #5a4530;
  }

  /* 环形按钮组 */
  .circle-buttons {
    position: relative;
    width: 160px;
    height: 160px;
    margin: 20px auto;
  }

  .pos-btn {
    position: absolute;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid rgba(0, 0, 0, 0.3);
    font-weight: bold;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    /* 从中心向外偏移 */
    left: 50%;
    top: 50%;
    transform: 
      translate(-50%, -50%) 
      rotate(var(--angle)) 
      translateY(-60px) 
      rotate(calc(-1 * var(--angle)));
  }

  .pos-btn:hover {
    transform: 
      translate(-50%, -50%) 
      rotate(var(--angle)) 
      translateY(-60px) 
      rotate(calc(-1 * var(--angle)))
      scale(1.15);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .pos-btn.red {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%);
    color: #fff;
  }

  .pos-btn.yellow {
    background: linear-gradient(135deg, #ffd93d 0%, #f5c518 100%);
    color: #333;
  }

  .pos-btn.blue {
    background: linear-gradient(135deg, #4dabf7 0%, #339af0 100%);
    color: #fff;
  }

  .pos-btn.purple {
    background: linear-gradient(135deg, #da77f2 0%, #be4bdb 100%);
    color: #fff;
  }

  .pos-btn.active {
    box-shadow: 0 0 0 3px #fff, 0 0 0 5px #333;
    transform: 
      translate(-50%, -50%) 
      rotate(var(--angle)) 
      translateY(-60px) 
      rotate(calc(-1 * var(--angle)))
      scale(1.2);
  }

  .circle-center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    font-weight: bold;
    color: #2c3e50;
    background: rgba(255, 255, 255, 0.8);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed #999;
  }

  @media (max-width: 600px) {
    main {
      padding: 10px;
    }

    .content {
      padding: 15px;
    }

    h2 {
      font-size: 1.1rem;
    }
  }
</style>
