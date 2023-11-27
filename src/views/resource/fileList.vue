<template>
    <div class="fileList">
        <!-- 顶部按钮 -->
        <div class="top" v-if="!isAdding && !isEditing">
            <div class="search">
                <input class="search_input" type="text" v-model="searchName">
                <img class="search_btn" @click="search" src="../../assets/resource/search.png">
            </div>
            <div>
                <select class="select" v-model="column" @click="setColumn" required>
                    <option v-for="col in columns">{{col.name}}</option>
                </select>
            </div>
            <div class="del_file_btn" style="margin-left: 32vw;" @click="addFile">
                <img src="../../assets/resource/plus.svg">
                <div class="del_file_font" style="width: 100px;">添加文件</div>
            </div>
            <div class="del_file_btn">
                <img src="../../assets/resource/del.svg">
                <div class="del_file_font" @click="multipleDelete">删除</div>
            </div>
        </div>
        <!-- 列表 -->
        <el-table :data="tableData" border empty-text="暂无数据" ref="multipleTableRef" v-if="!isAdding && !isEditing"
            @selection-change="handleSelectionChange" style="width: 100%; margin-top: 40px;">
            <el-table-column :resizable="false" min-width="30px" type="selection" align="center" />
            <el-table-column prop="title" label="文件名称" />
            <el-table-column prop="createdTime" label="上传时间" sortable>
                <!-- <template #default="scope">{{scope.row.time.split(".")[0].split("T").join(" ")}}</template> -->
            </el-table-column>
            <el-table-column prop="num" label="文件数量" />
            <el-table-column prop="path" label="附件">
                <template #default="scope">
                    <a :href=scope.row.path v-if="scope.row.path">{{scope.row.title}}</a>
                    <p v-if="!scope.row.path">无</p>
                </template>
            </el-table-column>
            <el-table-column prop="attachment" label="" width="150">
                <template #default="scope">
                    <div style="width:100%;height:30px;display: flex; justify-content: center;">
                        <div class="del_file_btn" style="width:60px;height:30px;"
                            @click="editFile(scope.row.libraryFileId, scope.row.title, scope.row.path, scope.row.text)">
                            <div class="del_file_font">编辑</div>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页查询 -->
        <div class="bottom_blank" v-if="!isAdding && !isEditing"></div>
        <el-pagination
            v-if="!isAdding && !isEditing"
            class="pagination"
            :current-page="currentPage"
            :page-size="12"
            layout="jumper, prev, pager, next"
            :page-count="pageCount"
            @current-change="handlePageChange"
        />
        <!-- 添加文件 -->
        <div v-if="isAdding" class="write">
            <img src="../../assets/resource/back.svg" class="back" @click="back">
            <div class="write_title">
                <div class="write_title_font">标题</div>
                <input type="text" class="write_title_input" v-model="add_title" />
            </div>
            <div class="write_p">
                <div class="write_title_font">所属栏目</div>
                <div>
                    <select class="selectInput" v-model="add_column" required>
                        <option v-for="col in columns">{{col.name}}</option>
                    </select>
                </div>
            </div>
            <div class="write_input_out">
                <div class="write_title_font">内容</div>
                <textarea class="write_input" v-model="add_text"></textarea>
            </div>
            <div class="write_addPic">
                <button @click="inputAddFile" v-if="currentAddFile">
                    <p>添加文件</p>
                    <img src="../../assets/resource/plus.svg" />
                </button>
                <button @click="inputEditFile" v-if="currentAddFile">
                    <p>更换文件</p>
                    <img src="../../assets/resource/plus.svg" @change="uploadFile_edit" />
                </button>
                <input type="file" ref="add_file" id="add_file" style=" opacity: 0;" @change="getFile(e)" />
            </div>
            <button class="write_submit" @click="finishAdd">完&#12288;成</button>
        </div>
        <!-- 编辑文件 -->
        <div v-if="isEditing" class="write">
            <img src="../../assets/resource/back.svg" class="back" @click="back">
            <div class="write_title">
                <div class="write_title_font">标题</div>
                <input type="text" class="write_title_input" v-model="edit_title" />
            </div>
            <!-- <div class="write_p">
                <div class="write_title_font">所属栏目</div>
                <div>
                    <select class="selectInput" v-model="edit_column" required>
                        <option v-for="col in columns">{{col.name}}</option>
                    </select>
                </div>
            </div> -->
            <div class="write_input_out">
                <div class="write_title_font">内容</div>
                <textarea class="write_input" v-model="edit_text"></textarea>
            </div>
            <div class="write_addPic">
                <button @click="inputEditFile" v-if="!currentEditFile">
                    <p>添加文件</p>
                    <img src="../../assets/resource/plus.svg" @change="uploadFile_edit" />
                </button>
                <button @click="inputEditFile" v-if="currentEditFile">
                    <p>更换文件</p>
                    <img src="../../assets/resource/plus.svg" @change="uploadFile_edit" />
                </button>
                <input type="file" ref="edit_file" id="edit_file" style=" opacity: 0;" @change="getFileEdit(e)" />
            </div>
            <button class="write_submit" @click="finishEdit">完&#12288;成</button>
        </div>
    </div>
</template>

<script>
    import { computed, ref, watch } from "vue";
    import { ElTable } from 'element-plus';
    import request from "@/utils/pub-use.ts";
    import { getResourceFile, getColumnFile, searchResourceFile, deleteResourceFile, addResourceFile, getColumn, alterResourceFile } from '@/api/resource.ts';
    import { uploadFile, downloadFile } from '@/api/file.ts';
    export default {
        components: {
        },
        data() {
            return {
                searchName: "",
                column: "",
                columns: [],
                tableData: [],
                multipleSelection: [],
                isAdding: false,
                isEditing: false,
                //分页查询
                currentPage: 1,
                pageCount: 1,
                // 添加文件
                add_title: '',
                add_column: '',
                add_text: '',
                currentAddFile: '',
                //编辑文件
                editId: -1,
                edit_title: '',
                edit_column: '',
                edit_text: '',
                currentEditFile: '',
                edit_filePath: '',
            };
        },
        created() {
            getColumn().then((v) => {
                let temp = v.data
                function sortRule(a, b) {
                    return a.position - b.position;
                }
                temp.sort(sortRule);
                let columns = []
                for (let i = 0; i < temp.length; i++) {
                    let c = { name: temp[i].name, columnId: temp[i].columnId }
                    columns.push(c)
                }
                this.columns = columns
                this.column = columns[0].name
                if (this.$route.query.column) {
                    this.column = this.$route.query.column
                }
                this.refresh()
            })
        },
        methods: {
            refresh() {
                let id
                for (let i = 0; i < this.columns.length; i++) {
                    if (this.column === this.columns[i].name) {
                        id = this.columns[i].columnId
                    }
                }
                let params = { "columnId": parseInt(id), "page": this.currentPage}
                getColumnFile(params).then(v => {
                    this.tableData = v.data
                    for (let i = 0; i < this.tableData.length; i++) {
                        if (this.tableData[i].path) {
                            this.tableData[i].path = import.meta.env.VITE_APP_SERVER_URL + '/d/' + this.tableData[i].path
                        }
                    }
                    this.pageCount = v.page.pageTotalCount
                })
            },
            handlePageChange(val){
                this.currentPage = val;
                this.refresh()
            },
            setColumn() {
                this.refresh()
            },
            search() {
                if (this.searchName) {
                    searchResourceFile(this.searchName).then(v => {
                        let id
                        for (let j = 0; j < this.columns.length; j++) {
                            if (this.column === this.columns[j].name)
                                id = this.columns[j].columnId
                        }
                        this.tableData = []
                        for (let i = 0; i < v.data.length; i++) {
                            if (id === v.data[i].columnId) {
                                this.tableData.push(v.data[i])
                            }
                        }
                    })
                } else {
                    this.refresh()
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            multipleDelete() {
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    deleteResourceFile(this.multipleSelection[i].libraryFileId).then((v) => {
                        this.refresh()
                    })
                }
            },
            addFile() {
                this.isAdding = true
            },
            editFile(id, title, path, text) {
                this.isEditing = true
                this.editId = id
                this.edit_title = title
                this.edit_filePath = path
                this.edit_text = text
            },
            inputAddFile() {
                this.$refs.add_file.click()
            },
            inputEditFile() {
                this.$refs.edit_file.click()
            },
            getFile(e) {
                this.currentAddFile = this.$refs.add_file.files[0]
            },
            getFileEdit(e) {
                this.currentEditFile = this.$refs.edit_file.files[0]
            },
            finishAdd() {
                let id
                for (let i = 0; i < this.columns.length; i++) {
                    if (this.add_column === this.columns[i].name) {
                        id = this.columns[i].columnId
                    }
                }
                let add_filePath = ""
                let formData = new FormData()
                formData.append('file', this.currentAddFile)
                uploadFile(formData).then(v => {
                    if (v.code == 0) {
                        // add_filePath = "http://101.42.225.75:1234/d/" + v.data
                        add_filePath = v.data
                    }
                }).then(() => {
                    let params = { "text": this.add_text, "columnId": id, "path": add_filePath, "title": this.add_title }
                    addResourceFile(params).then(v => {
                        console.log(1)
                        this.refresh()
                        this.isAdding = false
                    })
                })
            },
            finishEdit() {
                let edit_filePath = ""
                let formData = new FormData()
                formData.append('file', this.currentEditFile)
                uploadFile(formData).then(v => {
                    if (v.code == 0) {
                        // add_filePath = "http://101.42.225.75:1234/d/" + v.data
                        this.edit_filePath = v.data
                    }
                }).then(() => {
                    let params = { "libraryFile": this.editId, "text": this.edit_text, "path": this.edit_filePath, "title": this.edit_title }
                    alterResourceFile(params).then(v => {
                        this.refresh()
                        this.isEditing = false
                    })
                })
            },
            back() {
                this.isAdding = false
                this.isEditing = false
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

    .select {
        margin-left: 30px;
        font-size: 20px;
        width: 150px;
        height: 40px;
        border-radius: 5px;
        border: solid 2px rgb(244, 243, 243);
        outline-color: rgb(244, 243, 243);

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
    .bottom_blank{
        height: 120px;
    }
    .pagination {
        position: absolute;
        bottom: 40px;
        right: 70px;
    }
    /* 添加文件 */
    .write {
        position: relative;
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
    }

    .selectInput {
        font-size: 20px;
        width: 200px;
        height: 48px;
        border-radius: 4px;
        margin-left: 28px;
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
        margin-top: 24px;
        margin-left: 160px;
    }

    .write_addPic button {
        cursor: pointer;
        text-align: left;
        display: flex;
        position: absolute;
        align-items: center;
        width: 137px;
        height: 36px;
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

    .back {
        position: absolute;
        top: 40px;
        left: 30px;
        height: 60px;
    }
</style>