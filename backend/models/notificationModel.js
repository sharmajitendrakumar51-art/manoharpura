import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(

{

    title:{

        type:String,

        required:true,

        trim:true,

    },

    message:{

        type:String,

        required:true,

        trim:true,

    },

    notificationDate:{

        type:Date,

        required:true,

    },

    type:{

        type:String,

        enum:[
            "Info",
            "Success",
            "Warning",
            "Urgent",
        ],

        default:"Info",

    },

    status:{

        type:String,

        enum:[
            "Active",
            "Inactive",
        ],

        default:"Active",

    },

    targetAudience:{

        type:String,

        enum:[
            "All Members",
            "Executive Committee",
        ],

        default:"All Members",

    },

    attachment:{

        url:{

            type:String,

            default:"",

        },

        public_id:{

            type:String,

            default:"",

        }

    }

},

{

    timestamps:true,

}

);

export default mongoose.model(
    "Notification",
    notificationSchema
);