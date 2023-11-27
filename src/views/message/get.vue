<template>
    <div class="fileList">
        <!-- 顶部按钮 -->
        <div class="top" v-if="!isChecking && !isEditing">
            <div class="search">
                <input class="search_input" type="text">
                <img class="search_btn" @click="search" src="../../assets/message/search.png">
            </div>
            <div class="selectIsReply">
                <div></div>
                <input type="radio" v-if="!checkIsReply" name="selectIsReply" @click="checkReply(false)" checked />
                <p v-if="!checkIsReply">未回复</p>
                <input type="radio" v-if="!checkIsReply" name="selectIsReply" @click="checkReply(true)" />
                <p v-if="!checkIsReply">已回复</p>
                <input type="radio" v-if="checkIsReply" name="selectIsReply" @click="checkReply(false)" />
                <p v-if="checkIsReply">未回复</p>
                <input type="radio" v-if="checkIsReply" name="selectIsReply" @click="checkReply(true)" checked />
                <p v-if="checkIsReply">已回复</p>
            </div>
            <div class="del_file_btn" style="margin-left: 25vw;" @click="multipleDelete">
                <img src="../../assets/resource/del.svg">
                <div class="del_file_font" style="width: 100px; margin-left: 20px;">删除</div>
            </div>
        </div>
        <!-- 列表 -->
        <el-table :data="tableData" border empty-text="暂无数据" ref="multipleTableRef" v-if="!isChecking && !isEditing"
            @selection-change="handleSelectionChange" style="width: 100%; margin-top: 40px;">
            <el-table-column :resizable="false" min-width="30px" type="selection" align="center" />
            <el-table-column prop="senderId" label="发件人" />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="sendTime" label="时间" sortable>
                <!-- <template #default="scope">{{scope.row.time.split(".")[0].split("T").join(" ")}}</template> -->
            </el-table-column>
            <el-table-column prop="handlerId" label="处理人" />
            <el-table-column prop="attachment" label="" min-width="100">
                <template #default="scope">
                    <div style="width:100%;height:30px;display: flex; justify-content: center; align-items: center;">
                        <div>
                            <el-button auto-insert-space @click="check(scope.$index)">查看</el-button>
                            <el-button auto-insert-space @click="edit(scope.$index)">回复</el-button>
                            <el-popconfirm title="您确定要删除这个栏目吗？" confirm-button-text="确认" cancel-button-text="取消"
                                @confirm="handleDelete(scope.row.id)">
                                <template #reference>
                                    <el-button auto-insert-space type="danger">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 回信 -->
        <div v-if="isEditing" class="write">
            <img src="../../assets/resource/cross.svg" class="close" @click="closeEdit">
            <div class="write_title">
                <div class="write_title_font">标题</div>
                <input type="text" class="write_title_input" v-model="title" />
            </div>
            <!-- <div class="write_p">
                <div class="write_title_font">对象</div>
                <div>
                    <select class="selectInput" required>
                        <option>全校师生</option>
                    </select>
                </div>
            </div> -->
            <div class="write_input_out">
                <div class="write_title_font">内容</div>
                <textarea class="write_input" v-model="content"></textarea>
            </div>
            <div class="write_addPic">
                <button>
                    <p>添加文件</p>
                    <img src="../../assets/resource/plus.svg" />
                </button>
                <input type="file" />
            </div>
            <button class="write_submit" @click="post">发&#12288;送</button>
        </div>
        <!-- 查看 -->
        <div v-if="isChecking" class="check">
            <div class="write_title">
                <div class="check_title_font">发件人</div>
                <div class="check_title_content">{{tableData[this.current].senderId}}</div>
            </div>
            <div class="write_title">
                <div class="check_title_font">标题</div>
                <div>
                    <div class="check_title_content">{{tableData[this.current].title}}</div>
                </div>
            </div>
            <div class="check_content">
                <div class="write_title_font">内容</div>
                <div class="write_input">{{current_content}}</div>
            </div>
            <button class="check_close" @click="closeCheck">关&#12288;闭</button>
        </div>
    </div>
</template>

<script>
    import { computed, ref, watch } from "vue";
    import { ElTable } from 'element-plus'
    import { adminGetMessage, adminReplyMessage } from '@/api/message.ts';
    import { getToken } from '@/utils/auth.ts';
    export default {
        components: {
        },
        data() {
            return {
                data: [],
                tableData: [
                ],
                multipleSelection: [],
                checkIsReply: false,
                isChecking: false,
                isEditing: false,
                current: -1,
                current_content: "aaaaaaaaaaaaaaaaaaaaaaaaa",
                // 回复信件传参
                replyIndex: -1,
                receiverId: 0,
                title: "",
                content: "",
            };
        },
        created() {
            this.refresh()
        },
        methods: {
            refresh() {
                adminGetMessage(getToken()).then((v) => {
                    this.data = v.data
                    this.checkReply()
                    console.log(v)
                })
            },
            search() { },
            checkReply(isReply) {
                this.checkIsReply = isReply
                this.tableData = []
                for (let i = 0; i < this.data.length; i++) {
                    if (this.checkIsReply) {  //筛选出已回复的站内信 status==0已回复
                        if (!this.data[i].status) {
                            this.tableData.push(this.data[i])
                        }
                    } else {  //筛选出未回复的站内信
                        if (this.data[i].status) {
                            this.tableData.push(this.data[i])
                        }
                    }
                }

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            edit(i) {
                this.replyIndex = i
                this.isEditing = true
            },
            closeEdit() {
                this.isEditing = false
            },
            post() {
                let i = this.replyIndex
                console.log(this.tableData)
                let params = {
                    receiverId: this.tableData[i].senderId,            //发送对象
                    title: this.title,                      //信件题目
                    content: this.content,                  //信件内容
                    replyMessageId: this.tableData[i].messageInfoId,    //所回复的信件的id
                    token: getToken()
                }
                adminReplyMessage(params).then((v) => {

                })
                this.closeEdit()
            },
            check(i) {
                this.isChecking = true
                this.current = i
                this.current_content = this.tableData[i].content
            },
            closeCheck() {
                console.log(this.checkIsReply)
                this.isChecking = false
            }
        },
    };
</script>
<style scoped>
    /* 主页 */
    .fileList {
        display: flex;
        position: relative;
        flex-direction: column;

    }

    .top {
        z-index: 0;
        width: 100vw;
        height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }

    .search {
        display: flex;
        height: 40px;
        border-radius: 100px;
        border: solid 2px rgb(228, 72, 80);
    }

    .search_input {
        height: 35px;
        width: 300px;
        margin-left: 15px;
        border: none;
        outline: none;
    }

    .search_btn {
        height: 35px;
        width: 35px;
        cursor: pointer;
        line-height: 40px;
        font-size: 16px;
        margin: 1.5px 10px;
        transition: 0.4s;
    }

    .selectIsReply {
        width: 20vw;
        display: flex;
        align-items: center;
        margin-left: 2vw;
    }

    .selectIsReply input {
        margin-left: 1vw;
        height: 35px;
    }

    .selectIsReply p {
        height: 35px;
        line-height: 35px;
        font-size: 18px;
    }

    .del_file_btn {
        margin-left: 10px;
        transition: 0.4s;
        border-radius: 6px;
        color: white;
        cursor: pointer;
        font-size: 16px;
        background-color: rgb(228, 72, 80);
        height: 40px;
        width: 115px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .del_file_btn:hover {
        background-color: rgba(228, 72, 80, 0.84);
    }

    .del_file_btn img {
        margin-left: 10px;
        height: 20px;
        width: 20px;
    }

    .del_file_font {
        margin-left: 10px;
        width: 50px;
        line-height: 40px;
        height: 40px;
        font-size: 16px;
    }

    /* 写信 */
    .close {
        width: 25px;
        position: absolute;
        top: 0;
        right: 15px;
    }

    .write {
        display: flex;
        font-size: 20px;
        font-family: Noto Sans SC-DemiLight, Noto Sans SC;
        font-weight: normal;
        display: flex;
        flex-direction: column;
    }

    .write_p {
        margin-left: 160px;
        margin-top: 28px;
        height: 48px;
        width: 552px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .selectInput {
        font-size: 20px;
        width: 442px;
        height: 48px;
        border-radius: 4px;
        border: solid 2px rgb(244, 243, 243);
        outline-color: rgb(199, 36, 47);
    }

    .write_title {
        margin-left: 160px;
        margin-top: 46px;
        height: 48px;
        width: 1140px;
        display: flex;
        align-items: center;
        /* justify-content: space-between; */
    }

    .write_title_font {
        color: #2f2f2f;
        font-size: 20px;
        width: 80px;
    }

    .write_title_input {
        color: #2f2f2f;
        font-size: 18px;
        width: 1005px;
        height: 48px;
        margin-left: 28px;
        border-radius: 4px;
        border: solid 2px rgb(244, 243, 243);
        outline-color: rgb(199, 36, 47);
    }

    .write_input_out {
        margin-top: 32px;
        margin-left: 160px;
        width: 1140px;
        height: 434px;
        display: flex;

    }

    .write_input {
        position: relative;
        color: #505050;
        font-size: 18px;
        /* margin-top: 44px; */
        margin-left: 30px;
        resize: none;
        width: 1000px;
        height: 100%;
        border-color: rgb(255, 255, 255);
        outline-color: rgb(255, 255, 255);
    }

    .write_addPic {
        cursor: pointer;
        margin-top: 24px;
        margin-left: 160px;
    }

    .write_addPic button {
        pointer-events: none;
        text-align: left;
        display: flex;
        position: absolute;
        align-items: center;
        width: 137px;
        height: 36px;
        /* left: 512px; */
        font-size: 18px;
        z-index: 2;
        color: #FFFFFF;
        background-color: rgb(199, 36, 47);
        border: none;
        border-radius: 10px;
    }

    .write_addPic p {
        margin-left: 16px;
    }

    .write_addPic img {
        width: 24px;
        height: 24px;
        margin-left: 7px;
    }

    .write_addPic input {
        position: absolute;
        margin-top: 2px;
        left: 165px;
        z-index: 1;
        width: 130px;
        height: 33px;
    }

    .write_submit {
        margin-top: 66px;
        margin-left: 640px;
        text-align: center;
        line-height: 24px;
        color: white;
        font-size: 18px;
        height: 48px;
        width: 180px;
        background-color: rgb(199, 36, 47);
        border-radius: 80px;
        border: none;
        cursor: pointer;
    }

    /* 查看 */
    .check {
        display: flex;
        font-size: 20px;
        font-family: Noto Sans SC-DemiLight, Noto Sans SC;
        font-weight: normal;
        display: flex;
        flex-direction: column;
    }

    .check_p {
        margin-left: 160px;
        margin-top: 28px;
        height: 48px;
        width: 552px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .selectInput {
        font-size: 20px;
        width: 442px;
        height: 48px;
        border-radius: 4px;
        border: solid 2px rgb(244, 243, 243);
        outline-color: rgb(199, 36, 47);
    }

    .check_title_font {
        color: #2f2f2f;
        font-size: 20px;
        height: 48px;
        line-height: 48px;
        width: 80px;
    }

    .check_title_content {
        line-height: 48px;
        margin-left: 30px;
        color: #2f2f2f;
        font-size: 18px;
        width: 1030px;
        height: 48px;
    }

    .check_content {
        margin-top: 56px;
        margin-left: 160px;
        width: 1140px;
        height: 320px;
        display: flex;

    }

    .write_input_out {
        margin-top: 32px;
        margin-left: 160px;
        width: 1140px;
        height: 434px;
        display: flex;

    }

    .write_input {
        position: relative;
        color: #505050;
        font-size: 18px;
        /* margin-top: 44px; */
        margin-left: 30px;
        resize: none;
        width: 1000px;
        height: 100%;
        border-color: rgb(255, 255, 255);
        outline-color: rgb(255, 255, 255);
    }

    .write_addPic {
        cursor: pointer;
        margin-top: 24px;
        margin-left: 160px;
    }

    .write_addPic button {
        pointer-events: none;
        text-align: left;
        display: flex;
        position: absolute;
        align-items: center;
        width: 137px;
        height: 36px;
        /* left: 512px; */
        font-size: 18px;
        z-index: 2;
        color: #FFFFFF;
        background-color: rgb(199, 36, 47);
        border: none;
        border-radius: 10px;
    }

    .write_addPic p {
        margin-left: 16px;
    }

    .write_addPic img {
        width: 24px;
        height: 24px;
        margin-left: 7px;
    }

    .write_addPic input {
        position: absolute;
        margin-top: 2px;
        left: 165px;
        z-index: 1;
        width: 130px;
        height: 33px;
    }

    .check_close {
        margin-top: 66px;
        margin-left: 640px;
        text-align: center;
        line-height: 24px;
        color: white;
        font-size: 18px;
        height: 48px;
        width: 180px;
        background-color: rgb(199, 36, 47);
        border-radius: 80px;
        border: none;
        cursor: pointer;
    }
</style>