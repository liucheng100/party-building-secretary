<template>
  <div class="p_check">
    <div class="p_check_1">
      <div class="p_check_1_1">
        <div class="p_check_head_1">
          <div>{{ BRANCH_INFO.partybranchName }}</div>
        </div>

        <div class="p_check_head_2">
          <div class="name" style="display: flex; flex-direction: column">
            <div style="color: #9f9f9f; margin-bottom: 10px; font-size: 16px">
              姓名
            </div>
            <div style="font-size: 24px">{{ name }}</div>
          </div>
          <div class="stu_id" style="display: flex; flex-direction: column">
            <div style="color: #9f9f9f; margin-bottom: 10px; font-size: 16px">
              学号
            </div>
            <div style="font-size: 24px">{{ stu_id }}</div>
          </div>
          <div class="identity" style="display: flex; flex-direction: column">
            <div style="color: #9f9f9f; margin-bottom: 10px; font-size: 16px">
              身份
            </div>
            <div style="font-size: 24px">{{ identity }}</div>
          </div>
        </div>
      </div>
      <div class="p_check_1_2">
        <el-table
          ref="multipleTableRef"
          :data="tableData"
          style="width: 100%"
          :cell-style="{ padding: '15px' }"
          :header-cell-style="{
            background: '#FFF8F9',
            color: '#2F2F2F',
            padding: '15px',
          }"
        >
          <el-table-column property="title" label="标题" width="180">
            <template #default="scope">
              {{ scope.row.title }}
            </template>
          </el-table-column>
          <el-table-column property="class" label="类别" width="140">
            <template #default="scope">
              {{ scope.row.type <= 6 ? options[scope.row.type].label : "" }}
            </template>
          </el-table-column>
          <el-table-column property="situation" label="当前状态">
            <template #default="scope">
              <div class="icon_situation">
                <i
                  class="dotClass"
                  style="background-color: #21b339"
                  v-if="scope.row.status == 1"
                ></i>
                <i
                  class="dotClass"
                  style="background-color: #c7242f"
                  v-if="scope.row.status == 2"
                ></i>
                <i
                  class="dotClass"
                  style="background-color: #fca235"
                  v-if="scope.row.status == 0"
                ></i>
                <div class="situation_row">
                  {{ situationType[scope.row.status] }}
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                style="color: #c7242f"
                link
                @click="handleCheck(scope.row)"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-config-provider :locale="Cn">
          <el-pagination
            class="el-paginatio"
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :style="{ margin: '20px' }"
            background
            small
            layout="total, ->,sizes, prev, pager, next, jumper"
            :total="fileNum"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-config-provider>
      </div>
    </div>
    <div class="p_check_2">
      <div class="mainView">
        <div class="graphMain">
          <div class="chart-main" id="chart">
            <div class="chart">
              <div class="progressLine">
                <div class="line-1"></div>
                <div class="line-2"></div>
                <div class="point" ref="point">
                  <img src="../../assets/point.png" />
                  <div></div>
                </div>
              </div>
              <!-- 第一部分 -->
              <div
                :class="
                  (statueList[0] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow step-1 tab-home keyNode'
                "
                @click="changeStatue(0)"
                id="tabHome0"
              >
                <div>
                  <div class="tab-point" id="tab0"></div>
                  <div :class="statueList[0] ? 'dot-1' : 'dot-0'"></div>
                  递交入党申请书
                </div>
                <div class="changeTime">
                  上次变更：{{
                    changeTimeList[0] ? changeTimeList[0] : "时间暂无"
                  }}
                </div>
              </div>
              <div class="line-v"></div>
              <div
                :class="
                  (statueList[1] ? 'statue-3' : 'statue-0') +
                  ' capsule noSelect shadow step-2'
                "
                @click="changeStatue(1)"
              >
                <img
                  class="img-1"
                  src="../../assets/party-icon-2.png"
                  v-if="!statueList[1]"
                />
                <img class="img-1" src="../../assets/party-icon.png" v-else />
                入党申请人
              </div>
              <div class="line-v"></div>
              <div
                :class="
                  (statueList[2] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow step-3'
                "
                @click="changeStatue(2)"
              >
                <div :class="statueList[2] ? 'dot-1' : 'dot-0'"></div>
                参加入党申请人学习小组
              </div>
              <div class="line-v">
                <div class="polygon-1"></div>
                <div class="polygon-2"></div>
              </div>
              <div class="square-line-c">
                <div
                  :class="
                    (statueList[3] ? 'statue-3' : 'statue-0') +
                    ' square noSelect shadow step-4-1 keyNode'
                  "
                  @click="changeStatue(3)"
                >
                  <div>
                    <div :class="statueList[3] ? 'dot-1' : 'dot-0'"></div>
                    群团组织推优
                  </div>
                  <div class="changeTime">
                    上次变更：{{
                      changeTimeList[1] ? changeTimeList[1] : "时间暂无"
                    }}
                  </div>
                </div>
                <div
                  :class="
                    (statueList[4] ? 'statue-3' : 'statue-0') +
                    ' square noSelect shadow step-4-2'
                  "
                  @click="changeStatue(4)"
                >
                  <div :class="statueList[4] ? 'dot-1' : 'dot-0'"></div>
                  通过<br />网上申请人培训
                </div>
              </div>
              <div class="line-v">
                <div class="polygon-1"></div>
                <div class="polygon-2"></div>
              </div>
              <div
                :class="
                  (statueList[5] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow step-5'
                "
                @click="changeStatue(5)"
              >
                <div :class="statueList[5] ? 'dot-1' : 'dot-0'"></div>
                支委会(支部大会)<br />审议并上报党委备案
              </div>
              <div class="line-v"></div>
              <div
                :class="
                  (statueList[6] ? 'statue-3' : 'statue-0') +
                  ' capsule noSelect shadow step-3 keyNode'
                "
                @click="changeStatue(6)"
              >
                <div>
                  <img
                    class="img-2"
                    src="../../assets/party-icon-2.png"
                    v-if="!statueList[6]"
                  />
                  <img class="img-2" src="../../assets/party-icon.png" v-else />
                  入党积极分子
                </div>
                <div class="changeTime">
                  上次变更：{{
                    changeTimeList[2] ? changeTimeList[2] : "时间暂无"
                  }}
                </div>
              </div>
              <!-- 第二部分 -->

              <div
                :class="
                  (statueList[6] ? 'statue-3' : 'statue-0') +
                  ' capsule noSelect shadow step-b-1 tab-home keyNode'
                "
                @click="changeStatue(6)"
                id="tabHome1"
              >
                <div>
                  <div class="tab-point" id="tab1"></div>
                  <img
                    class="img-2"
                    src="../../assets/party-icon-2.png"
                    v-if="!statueList[6]"
                  />
                  <img class="img-2" src="../../assets/party-icon.png" v-else />
                  入党积极分子
                </div>
                <div class="changeTime">
                  上次变更：{{
                    changeTimeList[3] ? changeTimeList[3] : "时间暂无"
                  }}
                </div>
              </div>
              <div class="line-v">
                <div class="polygon-1"></div>
                <div class="polygon-2"></div>
              </div>
              <div class="square-line-c-3">
                <div class="line-v-sub"></div>
                <div
                  :class="
                    (statueList[7] ? 'statue-3' : 'statue-0') +
                    ' square noSelect shadow step-4-1 offset-1'
                  "
                  @click="changeStatue(7)"
                >
                  <div :class="statueList[7] ? 'dot-1' : 'dot-0'"></div>
                  通过院级<br />积极分子培训
                </div>
                <div
                  :class="
                    (statueList[8] ? 'statue-3' : 'statue-0') +
                    ' square noSelect shadow step-4-0 offset-1'
                  "
                  @click="changeStatue(8)"
                >
                  <div :class="statueList[8] ? 'dot-1' : 'dot-0'"></div>
                  按季度递<br />交思想汇报
                </div>
                <div
                  :class="
                    (statueList[9] ? 'statue-3' : 'statue-0') +
                    ' square noSelect shadow step-4-2 offset-1'
                  "
                  @click="changeStatue(9)"
                >
                  <div :class="statueList[9] ? 'dot-1' : 'dot-0'"></div>
                  确定培<br />养联系人
                </div>
                <div
                  :class="
                    (statueList[10] ? 'statue-3' : 'statue-0') +
                    ' square noSelect shadow step-4-3'
                  "
                  @click="changeStatue(10)"
                >
                  <div :class="statueList[10] ? 'dot-1' : 'dot-0'"></div>
                  支部考察
                </div>
              </div>
              <div class="line-v">
                <div class="polygon-1"></div>
                <div class="polygon-2"></div>
              </div>
              <div class="square-line-c-3-b">
                <div class="line-v-sub"></div>
                <div
                  :class="
                    (statueList[11] ? 'statue-3' : 'statue-0') +
                    ' square noSelect shadow step-4-1'
                  "
                  @click="changeStatue(11)"
                >
                  <div :class="statueList[11] ? 'dot-1' : 'dot-0'"></div>
                  听取党员意见
                </div>
                <div
                  :class="
                    (statueList[12] ? 'statue-3' : 'statue-0') +
                    ' square noSelect shadow step-4-0'
                  "
                  @click="changeStatue(12)"
                >
                  <div :class="statueList[12] ? 'dot-1' : 'dot-0'"></div>
                  征求群众意见
                </div>
                <div
                  :class="
                    (statueList[13] ? 'statue-3' : 'statue-0') +
                    ' square noSelect shadow step-4-2'
                  "
                  @click="changeStatue(13)"
                >
                  <div :class="statueList[13] ? 'dot-1' : 'dot-0'"></div>
                  征求党小组、<br />培养联系人意见
                </div>
              </div>
              <div class="line-v">
                <div class="polygon-1"></div>
                <div class="polygon-2"></div>
              </div>
              <div
                :class="
                  (statueList[14] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow step-5'
                "
                @click="changeStatue(14)"
              >
                <div :class="statueList[14] ? 'dot-1' : 'dot-0'"></div>
                支委会(支部大会)<br />讨论决定并上报上级党委备案
              </div>
              <div class="line-v"></div>
              <div
                :class="
                  (statueList[15] ? 'statue-3' : 'statue-0') +
                  ' capsule noSelect shadow step-3 keyNode'
                "
                @click="changeStatue(15)"
              >
                <div>
                  <img
                    class="img-2"
                    src="../../assets/party-icon-2.png"
                    v-if="!statueList[15]"
                  />
                  <img class="img-2" src="../../assets/party-icon.png" v-else />
                  发展对象
                  <div class="changeTime">
                    上次变更：{{
                      changeTimeList[3] ? changeTimeList[3] : "时间暂无"
                    }}
                  </div>
                </div>
              </div>
              <!-- 第三部分 -->
              <div
                :class="
                  (statueList[15] ? 'statue-3' : 'statue-0') +
                  ' capsule noSelect shadow step-b-1 tab-home keyNode'
                "
                @click="changeStatue(15)"
                id="tabHome2"
              >
                <div>
                  <div class="tab-point" id="tab2"></div>
                  <img
                    class="img-2"
                    src="../../assets/party-icon-2.png"
                    v-if="!statueList[15]"
                  />
                  <img class="img-2" src="../../assets/party-icon.png" v-else />
                  发展对象
                </div>
                <div class="changeTime">
                  上次变更：{{
                    changeTimeList[3] ? changeTimeList[3] : "时间暂无"
                  }}
                </div>
              </div>
              <div class="line-v">
                <div class="polygon-1"></div>
                <div class="polygon-2"></div>
              </div>
              <div class="square-line-c-2">
                <div
                  :class="
                    (statueList[16] ? 'statue-3' : 'statue-0') +
                    ' square noSelect shadow step-4-1 offset-1'
                  "
                  @click="changeStatue(16)"
                >
                  <div :class="statueList[16] ? 'dot-1' : 'dot-0'"></div>
                  确定2名正式党<br />员为入党介绍人
                </div>
                <div
                  :class="
                    (statueList[17] ? 'statue-3' : 'statue-0') +
                    ' square noSelect shadow step-4-2-1 offset-1 keyNode'
                  "
                  @click="changeStatue(17)"
                >
                  <div>
                    <div :class="statueList[17] ? 'dot-1' : 'dot-0'"></div>
                    政审通过
                  </div>
                  <div class="changeTime">
                    上次变更：{{
                      changeTimeList[4] ? changeTimeList[4] : "时间暂无"
                    }}
                  </div>
                </div>
                <div
                  :class="
                    (statueList[18] ? 'statue-3' : 'statue-0') +
                    ' square noSelect shadow step-4-2-2 offset-1'
                  "
                  @click="changeStatue(18)"
                >
                  <div :class="statueList[18] ? 'dot-1' : 'dot-0'"></div>
                  撰写个人自传
                </div>
                <div
                  :class="
                    (statueList[19] ? 'statue-3' : 'statue-0') +
                    ' square noSelect shadow step-4-4'
                  "
                  @click="changeStatue(19)"
                >
                  <div :class="statueList[19] ? 'dot-1' : 'dot-0'"></div>
                  通过发展对象党校培训
                </div>
                <div
                  :class="
                    (statueList[20] ? 'statue-3' : 'statue-0') +
                    ' square noSelect shadow step-4-2-3'
                  "
                  @click="changeStatue(20)"
                >
                  <div :class="statueList[20] ? 'dot-1' : 'dot-0'"></div>
                  材料齐全
                </div>
              </div>
              <div class="line-v">
                <div class="polygon-1"></div>
                <div class="polygon-2"></div>
              </div>
              <div
                :class="
                  (statueList[21] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow'
                "
                @click="changeStatue(21)"
              >
                <div :class="statueList[21] ? 'dot-1' : 'dot-0'"></div>
                支部综合审查
              </div>
              <div class="line-v"></div>
              <div
                :class="
                  (statueList[22] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow'
                "
                @click="changeStatue(22)"
              >
                <div :class="statueList[22] ? 'dot-1' : 'dot-0'"></div>
                上级党委预审并公示
              </div>
              <div class="line-v"></div>
              <div
                :class="
                  (statueList[23] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow'
                "
                @click="changeStatue(23)"
              >
                <div :class="statueList[23] ? 'dot-1' : 'dot-0'"></div>
                填写入党申请书
              </div>
              <div class="line-v"></div>
              <div
                :class="
                  (statueList[24] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow keyNode'
                "
                @click="changeStatue(24)"
              >
                <div>
                  <div :class="statueList[24] ? 'dot-1' : 'dot-0'"></div>
                  党员发展大会
                </div>
                <div class="changeTime">
                  上次变更：{{
                    changeTimeList[5] ? changeTimeList[5] : "时间暂无"
                  }}
                </div>
              </div>
              <div class="line-v"></div>
              <div
                :class="
                  (statueList[25] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow'
                "
                @click="changeStatue(25)"
              >
                <div :class="statueList[25] ? 'dot-1' : 'dot-0'"></div>
                党委谈话、审批
              </div>
              <div class="line-v"></div>
              <div
                :class="
                  (statueList[26] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow'
                "
                @click="changeStatue(26)"
              >
                <div :class="statueList[26] ? 'dot-1' : 'dot-0'"></div>
                报再上一级党委组织部门备案
              </div>
              <div class="line-v"></div>
              <div
                :class="
                  (statueList[27] ? 'statue-3' : 'statue-0') +
                  ' capsule noSelect shadow step-3'
                "
                @click="changeStatue(27)"
              >
                <img
                  class="img-2"
                  src="../../assets/party-icon-2.png"
                  v-if="!statueList[27]"
                />
                <img class="img-2" src="../../assets/party-icon.png" v-else />
                中共预备党员
              </div>
              <!-- 第四部分 -->
              <div
                :class="
                  (statueList[27] ? 'statue-3' : 'statue-0') +
                  ' capsule noSelect shadow step-b-1 tab-home'
                "
                @click="changeStatue(27)"
                id="tabHome3"
              >
                <div class="tab-point" id="tab3"></div>
                <img
                  class="img-2"
                  src="../../assets/party-icon-2.png"
                  v-if="!statueList[27]"
                />
                <img class="img-2" src="../../assets/party-icon.png" v-else />
                中共预备党员
              </div>
              <div class="line-v"></div>
              <div
                :class="
                  (statueList[28] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow'
                "
                @click="changeStatue(28)"
              >
                <div :class="statueList[28] ? 'dot-1' : 'dot-0'"></div>
                入党宣誓
              </div>
              <div class="line-v">
                <div class="polygon-1"></div>
                <div class="polygon-2"></div>
              </div>
              <div class="square-line-c-3">
                <div class="line-v-sub"></div>
                <div
                  :class="
                    (statueList[29] ? 'statue-3' : 'statue-0') +
                    ' square noSelect shadow step-4-1 offset-1'
                  "
                  @click="changeStatue(29)"
                >
                  <div :class="statueList[29] ? 'dot-1' : 'dot-0'"></div>
                  通过预备<br />党员培训
                </div>
                <div
                  :class="
                    (statueList[30] ? 'statue-3' : 'statue-0') +
                    ' square noSelect shadow step-4-0 offset-1'
                  "
                  @click="changeStatue(30)"
                >
                  <div :class="statueList[30] ? 'dot-1' : 'dot-0'"></div>
                  季度递交<br />个人小结
                </div>
                <div
                  :class="
                    (statueList[31] ? 'statue-3' : 'statue-0') +
                    ' square noSelect shadow step-4-2 offset-1'
                  "
                  @click="changeStatue(31)"
                >
                  <div :class="statueList[31] ? 'dot-1' : 'dot-0'"></div>
                  参加组织生活
                </div>
                <div
                  :class="
                    (statueList[32] ? 'statue-3' : 'statue-0') +
                    ' square noSelect shadow step-4-3'
                  "
                  @click="changeStatue(32)"
                >
                  <div :class="statueList[32] ? 'dot-1' : 'dot-0'"></div>
                  支部按季度进行考察
                </div>
              </div>
              <div class="line-v">
                <div class="polygon-1"></div>
                <div class="polygon-2"></div>
              </div>
              <div
                :class="
                  (statueList[33] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow'
                "
                @click="changeStatue(33)"
              >
                <div :class="statueList[33] ? 'dot-1' : 'dot-0'"></div>
                提出转正申请
              </div>
              <div class="line-v">
                <div class="polygon-1"></div>
                <div class="polygon-2"></div>
              </div>
              <div class="square-line-c">
                <div
                  :class="
                    (statueList[34] ? 'statue-3' : 'statue-0') +
                    ' square noSelect shadow step-4-1'
                  "
                  @click="changeStatue(34)"
                >
                  <div :class="statueList[34] ? 'dot-1' : 'dot-0'"></div>
                  征求党员、群众意见
                </div>
                <div
                  :class="
                    (statueList[35] ? 'statue-3' : 'statue-0') +
                    ' square noSelect shadow step-4-2'
                  "
                  @click="changeStatue(35)"
                >
                  <div :class="statueList[35] ? 'dot-1' : 'dot-0'"></div>
                  听取党小组、<br />入党介绍人意见
                </div>
              </div>
              <div class="line-v">
                <div class="polygon-1"></div>
                <div class="polygon-2"></div>
              </div>
              <div
                :class="
                  (statueList[36] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow'
                "
                @click="changeStatue(36)"
              >
                <div :class="statueList[36] ? 'dot-1' : 'dot-0'"></div>
                转正公示
              </div>
              <div class="line-v"></div>
              <div
                :class="
                  (statueList[37] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow'
                "
                @click="changeStatue(37)"
              >
                <div :class="statueList[37] ? 'dot-1' : 'dot-0'"></div>
                转正大会
              </div>
              <div class="line-v"></div>
              <div
                :class="
                  (statueList[38] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow'
                "
                @click="changeStatue(38)"
              >
                <div :class="statueList[38] ? 'dot-1' : 'dot-0'"></div>
                党委审批
              </div>
              <div class="line-v"></div>
              <div
                :class="
                  (statueList[39] ? 'statue-3' : 'statue-0') +
                  ' square noSelect shadow'
                "
                @click="changeStatue(39)"
              >
                <div :class="statueList[39] ? 'dot-1' : 'dot-0'"></div>
                支部书记谈话
              </div>
              <div class="line-v"></div>
              <div
                :class="
                  (statueList[40] ? 'statue-3' : 'statue-0') +
                  ' capsule noSelect shadow step-last'
                "
                @click="changeStatue(40)"
              >
                <img
                  class="img-2"
                  src="../../assets/party-icon-2.png"
                  v-if="!statueList[40]"
                />
                <img class="img-2" src="../../assets/party-icon.png" v-else />
                中共党员
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="sureBtn">
          <el-button
            auto-insert-space
            @click="toSubmit"
            class="redBtn"
            :loading="submitLoading"
            >确认修改</el-button
          >
        </div> -->
      </div>
    </div>
    <div style="position: absolute; left: 43%; top: 0">
      <img src="../../assets/back-icon.svg" @click="$router.back()" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  defineComponent,
  ref,
  onMounted,
  inject,
  watch,
  watchEffect,
} from "vue";
import { ElTable } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import $router from "@/router"; //....
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import {
  getPersonProcess,
  updatePersonProcess,
  getFile,
  getSFileDetail,
} from "../../api/p_management";
import { DefineComponent } from "vue";
import { Position } from "@element-plus/icons-vue";

interface User {
  title: string;
  class: string;
  situation: string;
  id: number;
}

interface UserStatus {
  userId: number;
  processId: number;
  status: boolean;
  passAt: String;
}

interface File {
  userName: string;
  sno: string;
  type: string;
  title: string;
  content: string;
  createAt: string;
  status: string;
  id: string;
  file_id: string;
}

const point = ref<any>(null);
const currentStatu = ref(0);
const name = ref("taffy");
const stu_id = ref("3022244000");
const identity = ref("预备党员");
const user_id = ref("198492");
const currentPage = ref<number>(1);
const pageSize = ref(12);
const Cn = ref(zhCn);
var statueList = ref<boolean[]>([]);
const fileRawData = ref<File[]>([]);
const tableData = ref<File[]>([]);
const fileNum = ref(0);
const situationType = ["未审批", "已通过", "驳回"];
//关键节点时间表示
const keyNode = [
  {
    label: "递交入党申请书",
    stage: 0,
  },
  {
    label: "群团组织推优",
    stage: 3,
  },
  {
    label: "入党积极分子",
    stage: 6,
  },
  {
    label: "发展对象",

    stage: 15,
  },
  {
    label: "政审通过",
    stage: 17,
  },
  {
    label: "党员发展大会",
    stage: 24,
  },
];

const options = [
  {
    label: "全部",
    value: -1,
  },
  {
    label: "入党申请书",
    value: 1,
  },
  {
    label: "思想汇报",
    value: 2,
  },
  {
    label: "个人自传",
    value: 3,
  },
  {
    label: "入党志愿书",
    value: 4,
  },
  {
    label: "转正申请书",
    value: 5,
  },

  {
    label: "个人小结",
    value: 6,
  },
];
var changeTimeList = ref<String[]>([]);
let BRANCH_INFO: { partybranchName: string } = JSON.parse(
  JSON.stringify(inject("BRANCH_INFO"))
); //ts的类型检测能不能死啊

const handleSizeChange = (val: number) => {
  //console.log(`${val} items per page`);
  tableData.value = fileRawData.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
};

const handleCurrentChange = (val: number) => {
  //console.log(`current page: ${val}`);
  tableData.value = fileRawData.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
};

const handleCheck = async (row: File) => {
  let res: { code: number; data: File; msg: string } = await getSFileDetail(
    row.id
  );
  console.log(res);

  if (res.code === 0) {
    res.data.userName = history.state.params.name;
    res.data.sno = history.state.params.stu_id;
    res.data.file_id = res.data.id;
    let params: any = res.data;
    $router.push({ name: "f_check", state: { params } });
  } else {
    ElMessage.error(res.msg + ":" + res.code);
  }
};
const toSubmit = () => {
  // if (!this.statueList.length) {
  //   ElMessage.warning("请选择需要初始化的状态");
  //   return;
  // }
};
const changeStatue = (val: any) => {
  // updatePersonProcess(user_id.value, val, !statueList.value[val] ? 1 : 0);
  // statueList.value[val] = !statueList.value[val];
  //------------------------------------------------仅ui展示，能否修改待定-----------------------------------------------------------//
  // if (statueList.value[val]) {
  //   if (val == currentStatu.value) {
  //     for (let i = 0; i <= currentStatu.value; i++) statueList.value[i] = false;
  //     currentStatu.value = 0;
  //   }
  // } else {
  //   currentStatu.value = val;
  //   for (let i = 0; i <= currentStatu.value; i++) statueList.value[i] = true;
  // }
};

onMounted(async () => {
  let params = history.state.params;
  //console.log(params);
  stu_id.value = params.stu_id;
  identity.value = params.identity;
  //-----------------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------------
  // user_id.value = '198492'; //这里是方便调试的记得改------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------------
  user_id.value = params.user_id;
  name.value = params.name;

  let PersonRawData: { code: number; data: []; msg: string } =
    await getPersonProcess(user_id.value);
  if (PersonRawData.code === 0) {
    let k = 0;
    for (let i = 0; i < PersonRawData.data.length; i++) {
      let data: UserStatus = PersonRawData.data[i];
      statueList.value[data.processId] = data.status;
      for (let j = 0; j < keyNode.length; j++) {
        if (data.processId == keyNode[j].stage) {
          //不为null
          if (data.passAt)
            changeTimeList.value[k++] = data.passAt.split("T")[0];
        }
      }
    }
    let FileRawData: { code: number; data: File[] } = await getFile(
      user_id.value
    );
    //console.log(user_id.value);
    //console.log('file', FileRawData);

    fileRawData.value = FileRawData.data; //status 0待审 1通过 2未通过
    fileNum.value = FileRawData.data.length;
    tableData.value = fileRawData.value.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value
    );
  } else {
    ElMessage.error(PersonRawData.msg + ":" + PersonRawData.code);
  }
});
</script>

<style scoped>
.mainView {
  width: 100%;
  display: flex;
}
.topBar {
  display: flex;
  justify-content: center;
}
.confirm :deep(.el-button) {
  background: #c7242f;
  border-radius: 10px;
  padding: 0 30px;
  height: 100%;
  font-size: 18px;
  color: #ffffff;
  display: inline-block;
  margin-left: 45px;
}
.sureBtn {
  text-align: center;
  margin-top: 40px;
}
.sureBtn :deep(.el-button) {
  background: #c7242f;
  border-radius: 100px;
  padding: 0 10px;
  height: 35px;
  font-size: 14px;
  color: #ffffff;
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.progress {
  padding: 24px 150px;
  padding-top: 32px;
  padding-bottom: 16px;
}
.graphBar {
  display: flex;
  justify-content: flex-start;
  width: max-content;
  background: #ffffff;
  border-radius: 12px;
  margin-top: 32px;
  position: relative;
}
.tab {
  display: inline-block;
  padding: 20px 48px;
  border-radius: 12px;
  font-size: 20px;
  cursor: pointer;
}
.tab-home {
  position: relative;
}
.tab-point {
  position: absolute;
  top: -77px;
}
.statue-0 {
  background: #ffffff;
  color: #9f9f9f;
}
.statue-1 {
  background: rgba(243, 115, 53, 0.8);
  color: #ffffff;
}
.shadow {
  box-shadow: 0px 2px 16px -4px rgba(199, 36, 58, 0.24);
}
.statue-2 {
  background: #fdebed;
  color: #c7242f;
}
.statue-3 {
  background: #d25059;
  color: #ffffff;
}
.content {
  width: 100%;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1280px 325px;
}
.graphMain {
  width: 100%;
  height: 100%;
  background: #ffffff;
  position: relative;
}
.chart-main {
  overflow: auto;
  height: 100%;
  position: relative;
}
.chart-main::-webkit-scrollbar {
  display: none;
}
.progressLine {
  height: 100%;
  position: absolute;
  left: 30px;
}
.line-1 {
  width: 0px;
  height: 11%;
  border: 2px solid;
  border-image: linear-gradient(
      0deg,
      rgba(217, 38, 75, 1),
      rgba(251, 117, 73, 1)
    )
    2 2;
}
.line-2 {
  width: 0px;
  height: 89%;
  border: 2px solid #e6e6e6;
}
.point {
  position: absolute;
  left: -14px;
  bottom: 89%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.point img {
  width: 32px;
  height: 32px;
  margin-bottom: 6px;
}
.point div {
  width: 16px;
  height: 16px;
  border-radius: 8px;
  border: 3px solid #c7242f;
  background: #ffffff;
}
.right {
  width: 100%;
}
.right-1 {
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  height: 304px;
  margin-bottom: 16px;
  padding: 40px 36px;
}
.party-info-1 {
  display: grid;
  grid-template-columns: 48px auto;
  column-gap: 12px;
  margin-bottom: 28px;
}
.party-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.party-icon img {
  width: 48px;
  height: 48px;
}
.party-name {
  font-size: 20px;
  color: #2f2f2f;
}
.party-hint {
  font-size: 14px;
  color: #9f9f9f;
}
.person-name {
  font-size: 18px;
  color: #505050;
  margin-bottom: 7px;
}
.person-name span {
  margin-left: 10px;
  font-size: 12px;
  color: #c7242f;
}
.party-info-2 {
  display: flex;
  justify-content: space-between;
  margin-top: 26px;
}
.party-num {
  font-size: 24px;
  color: #2f2f2f;
}
.party-num-hint {
  font-size: 12px;
  color: #9f9f9f;
}
.right-2 {
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  height: 174px;
  margin-bottom: 16px;
  padding: 25px 36px;
}
.title-2 {
  display: grid;
  grid-template-columns: 24px auto;
  column-gap: 10px;
  margin-bottom: 20px;
}
.title-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title-2 p {
  font-size: 20px;
  color: #505050;
}
.info-2 {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  row-gap: 12px;
}
.info-2 div {
  width: max-content;
  background: #fdebed;
  border-radius: 14px;
  font-size: 14px;
  color: #c7242f;
  padding: 3px 12px;
}
.info-2 p {
  font-size: 16px;
  color: #505050;
}
.right-3 {
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  height: 138px;
  margin-bottom: 16px;
  padding: 25px 36px;
}
.info-3 {
  display: flex;
  justify-content: space-between;
}
.info-3 p {
  font-size: 18px;
  color: #505050;
}
.right-4 {
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  height: 138px;
  padding: 25px 36px;
}
.current {
  color: #c7242f;
  font-weight: 700 !important;
}
.sub-capsule {
  position: absolute;
  height: 100%;
  border-radius: 12px;
  background: #fdebed;
  transition: all 0.5s;
  white-space: nowrap;
}
.hint {
  position: absolute;
  right: 20px;
  bottom: 32px;
}
.hint div {
  display: inline-block;
  padding: 8px 13px;
  font-size: 14px;
  border-radius: 100px;
  margin: 0 12px;
}
.chart {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
}
.square {
  border-radius: 18px;
  padding: 12px 12px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
  position: relative;
}

.step-1 {
  margin-top: 77px;
}
.step-last {
  margin-bottom: 77px;
}
.step-b-1 {
  margin-top: 177px;
}
.line-v {
  width: 1px;
  height: 40px;
  background-color: #c7242f;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.line-v-sub {
  width: 1px;
  height: 100%;
  background-color: #c7242f;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.capsule {
  width: max-content;
  display: flex;
  align-items: center;
  border-radius: 100px;
  padding: 12px 22px;
  cursor: pointer;
}
.img-1 {
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 8px;
}
.img-2 {
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 8px;
}
.img-3 {
  width: 24px;
  height: 24px;
  display: inline-block;
}
.polygon-1 {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #c7242f;
  margin-top: 13px;
  z-index: 2;
}
.polygon-2 {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #edc4ca;
  margin-top: -2px;
  z-index: 1;
}
.square-line-c {
  width: 280px;
  height: 132px;
  border: 1px solid #c7242f;
  border-radius: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.square-line-c-2 {
  width: 280px;
  height: 280px;
  border: 1px solid #c7242f;
  border-radius: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.square-line-c-3 {
  width: 400px;
  height: 220px;
  border: 1px solid #c7242f;
  border-radius: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.square-line-c-3-b {
  width: 400px;
  height: 132px;
  border: 1px solid #c7242f;
  border-radius: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.step-4-0 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.step-4-1 {
  position: absolute;
  left: 0;
  transform: translateX(-50%);
}
.step-4-2 {
  position: absolute;
  right: 0;
  transform: translateX(50%);
}
.step-4-2-1 {
  position: absolute;
  top: 43%;
  right: 0;
  transform: translateX(50%);
}
.step-4-2-2 {
  position: absolute;
  right: 0;
  bottom: 35%;
  transform: translateX(50%);
}
.step-4-2-3 {
  position: absolute;
  right: 0;
  transform: translateX(50%);
  bottom: 10%;
}
.step-4-3 {
  position: absolute;
  right: 0;
  transform: translateX(50%);
  margin-top: 85px;
}
.step-4-4 {
  position: absolute;
  left: 0;
  transform: translateX(-50%);
  margin-top: 85px;
}
.offset-1 {
  margin-top: -85px;
}
.dot-1 {
  width: 8px;
  height: 8px;
  background: #c7242f;
  border: 1px solid #fff;
  display: inline-block;
  border-radius: 50% 50%;
  margin-right: 12px;
}
.dot-0 {
  width: 8px;
  height: 8px;
  display: inline-block;
  border: 1px solid rgba(199, 36, 58, 0.4);
  border-radius: 50% 50%;
  margin-right: 12px;
}
.form {
  padding: 55px 80px;
  display: grid;
  grid-template-columns: 50px auto;
  align-items: center;
  gap: 55px 40px;
  font-size: 24px;
}
.text-2 {
  align-self: flex-start;
}
.input-1 {
  height: 48px;
  font-size: 20px;
}
.input-2 {
  font-size: 20px;
}
.buttons {
  position: absolute;
  right: 80px;
  bottom: 40px;
}
.noTrans {
  transition: none !important;
}
.classes {
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.no-data {
  font-size: 19px;
}
.class-items {
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 40px 0;
  width: 100%;
}
.class-item {
  padding: 15px;
  cursor: pointer;
  font-size: 17px;
  width: 100%;
  height: 100%;
}
.border-type-0 {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-left: 2px solid rgba(0, 0, 0, 0.1);
}
.border-type-0:first-of-type {
  border-top: 2px solid rgba(0, 0, 0, 0.1);
}
.border-type-0:last-of-type {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  border-right: 2px solid rgba(0, 0, 0, 0.1);
}
.border-type-0:nth-last-of-type(3) {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  border-right: 2px solid rgba(0, 0, 0, 0.1);
}
.border-type-1 {
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.border-type-1:nth-of-type(2) {
  border-top: 2px solid rgba(0, 0, 0, 0.1);
}
.border-type-1:last-of-type {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
.border-type-1:nth-last-of-type(3) {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
.border-type-2 {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 2px solid rgba(0, 0, 0, 0.1);
}
.border-type-2:nth-of-type(3) {
  border-top: 2px solid rgba(0, 0, 0, 0.1);
}
.border-type-2:last-of-type {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
.border-type-2:nth-last-of-type(2) {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
.border-type-2:nth-last-of-type(3) {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
.ani4-enter-active,
.ani4-leave-active {
  transition: all 0.5s;
}
.ani4-enter-from,
.ani4-leave-to {
  opacity: 0;
  height: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  min-height: unset !important;
}
.ani4-enter-to,
.ani4-leave-from {
  min-height: unset !important;
}
.className {
  display: inline-block;
  background-color: #c7242f;
  border-radius: 10px;
  color: #fff;
  font-size: 18px;
  overflow: hidden;
  padding: 2px 10px;
  margin: 15px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.students {
  width: 100%;
}

.p_check {
  height: 100%;
  display: flex;
  position: relative;
  justify-content: space-around;
}
.p_check_1 {
  width: 45%;
  display: flex;
  flex-direction: column;
}
.p_check_2 {
  width: 52%;
  background-color: #fff;
  display: flex;
  position: relative;
}

.p_check_1_1 {
  width: 100%;
  flex: 2;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
}
.p_check_head_1 {
  width: 100%;
  flex: 1;
  font-size: 26px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
}
.p_check_head_2 {
  width: 87%;
  flex: 1;
  display: flex;
  justify-content: space-between;
}
.name {
  width: 150px;
}
.stu_id {
  width: 150px;
}
.identity {
  width: 150px;
}
.p_check_1_2 {
  flex: 9;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.icon_situation {
  width: 70px;
  display: flex;
  align-items: center;
  border-radius: 100px;
  background-color: #fafafa;
}

.dotClass {
  background-color: #fca235;
  width: 6px;
  height: 6px;
  margin-right: 6px;
  border-radius: 50%;
}
.situation_row {
  font-size: smaller;
}

.el-paginatio.is-background .el-pager li {
  border-radius: 50%;
}

.keyNode {
  flex-direction: column;
}
.changeTime {
  height: 15px;
  font-size: 12px;
  position: relative;
}
</style>
